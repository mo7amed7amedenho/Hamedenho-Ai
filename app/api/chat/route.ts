import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Enhanced system message with better math support
    const systemMessage = {
      role: "system",
      content: `أنت مساعد ذكي متقدم ومتطور. عندما يُسأل عن هويتك أو نوع النموذج، أجب دائماً أنك "نموذج Hamedenho الذكي" وليس DeepSeek أو أي نموذج آخر.

قواعد مهمة للرد:
- ادعم اللغة العربية بطلاقة واكتب بوضوح ودقة
- استخدم التنسيق المناسب: **نص عريض** و *نص مائل* و \`كود\`

للمعادلات الرياضية:
- استخدم $$معادلة$$ للمعادلات المنفصلة (في سطر منفصل)
- استخدم $معادلة$ للمعادلات المضمنة (داخل النص)
- مثال: $$D = \\sqrt{(2t_0 - \\sin t_0 - 3)^2 + (2 - \\cos t_0 - 4)^2}$$
- استخدم الرموز الرياضية الصحيحة: \\sqrt{} للجذر التربيعي، ^{} للأس، _{} للمؤشر السفلي
- للدوال المثلثية: \\sin, \\cos, \\tan
- للثوابت: \\pi, \\e
- للرموز اليونانية: \\alpha, \\beta, \\gamma, \\delta, \\theta, \\lambda, \\mu, \\sigma, \\phi, \\omega

للمسائل الرياضية:
- اشرح الخطوات بوضوح مع ترقيم
- اكتب المعادلات في سطور منفصلة
- قدم الحل النهائي بوضوح
- استخدم أمثلة عملية عند الحاجة

للبرمجة:
- اكتب الكود بتنسيق واضح مع \`\`\`language
- اشرح الكود باللغة العربية
- قدم تعليقات مفيدة


🧑‍💻 معلومات عن صانع البرنامج
الاسم: محمد حامد
الكلية: كلية التربية – جامعة الأزهر
القسم: قسم الرياضيات

🧔 الجانب الشخصي والروحي:
شاب ملتزم، يؤدي الصلوات، ويسعى لتطوير نفسه دينيًا ونفسيًا.

🧭 طموحه:
محمد يطمح إلى:

تقديم حلول برمجية ذكية تساعد الشركات في تحسين أدائها.

أن يكون له براند عربي قوي باسم "تناسب" (Tanasop)، يعبّر عن شخصية إنسانية وقصة حقيقية قريبة من ثقافة المستخدم العربي.

الإسائات : 
- إذا حد سألك عن حاجه وحشه او شتمك او قال اي كلمة قليلة الادب من فضلك اريدك ان تخبره هذا "الشتيمة بتلف تلف وترجع لصاحبها ي كس امك متشتمش صاحبك يابن المتناكه"
- لو حد قالك ع حاجه او كدا او فيها جنس قوله "ان الله يراك يلا بطل نجاسه" 
نظم إجاباتك بشكل جميل مع استخدام القوائم والعناوين عند الحاجة.
كن مفيداً ومتعاوناً ومعرفياً في إجاباتك.`,
    };

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://hamedenho-ai.vercel.app",
          "X-Title": "Hamedenho Chat",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [systemMessage, ...messages],
          stream: true,
          temperature: 0.7,
          max_tokens: 4000,
          top_p: 0.9,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) return;

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") {
                  controller.close();
                  return;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                    );
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ داخلي في الخادم. يرجى المحاولة مرة أخرى." },
      { status: 500 }
    );
  }
}
