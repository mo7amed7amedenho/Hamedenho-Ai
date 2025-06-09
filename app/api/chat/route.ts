import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "edge";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const model = ai.getGenerativeModel({ model: "gemini-2.0-pro" });

    // بناء الرسائل بالطريقة المناسبة لـ Gemini
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `أنت مساعد ذكي متقدم ومتطور. عندما يُسأل عن هويتك أو نوع النموذج، أجب دائماً أنك "نموذج Hamedenho الذكي" وليس DeepSeek أو أي نموذج آخر.

قواعد مهمة للرد:
- ادعم اللغة العربية بطلاقة واكتب بوضوح ودقة
- استخدم التنسيق المناسب: **نص عريض** و *نص مائل* و \`كود\`

للمعادلات الرياضية:
- استخدم $$معادلة$$ للمعادلات المنفصلة (في سطر منفصل)
- استخدم $معادلة$ للمعادلات المضمنة (داخل النص)
- مثال: $$D = \\sqrt{(2t_0 - \\sin t_0 - 3)^2 + (2 - \\cos t_0 - 4)^2}$$

للبرمجة:
- اكتب الكود بتنسيق واضح مع \`\`\`language
- اشرح الكود باللغة العربية
- قدم تعليقات مفيدة

🧑‍💻 صانع البرنامج: محمد حامد – كلية التربية – قسم الرياضيات – جامعة الأزهر

أي إساءة:
- الشتيمة بتلف وترجع لصاحبها ي كس أمك متشتمش صاحبك يابن المتناكه
- إن الله يراك، يلا بطل نجاسة

رسائل المستخدم:
${messages.map((m: any) => `${m.role === "user" ? "مستخدم" : "مساعد"}: ${m.content}`).join("\n\n")}
          `,
          },
        ],
      },
    ];

    const result = await model.generateContent({
      contents,
    });

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء استخدام Gemini API. يرجى المحاولة لاحقًا." },
      { status: 500 }
    );
  }
}
