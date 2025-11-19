import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-pink-100 flex flex-col items-center justify-center py-4" dir="rtl">
      <div className="w-full max-w-4xl mx-auto">
        <HTMLFlipBook
          width={400}
          height={500}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={420}
          maxHeight={1050}
          maxShadowOpacity={0.5}
          mobileDisplay="single"
          flippingTime={1000}
          usePortrait={false}
          startPage={0}
          className="w-full h-auto"
        >
          {/* Page 1: Cover */}
          <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-amber-100 to-pink-100 border-2 border-emerald-700 rounded-lg shadow-lg text-center">
            <img 
              src="https://www.guarderiawininos.es/wp-content/uploads/2021/08/actividad-wininos11-scaled.jpg" 
              alt="Cover" 
              className="w-full max-w-md h-[60%] object-cover rounded mb-4" 
            />
            <h1 className="text-3xl font-bold text-black">الطيف: قصص للأطفال من طيف التوحد</h1>
          </div>

          {/* Page 2: نظرة عامة */}
          <div className="h-full p-8 bg-gradient-to-b from-amber-100 to-pink-100 border-2 border-emerald-700 rounded-lg shadow-lg overflow-y-auto text-right">
            <h1 className="text-2xl font-bold text-black mb-4">نظرة عامة</h1>
            <p className="text-gray-800 leading-relaxed mb-4">يهدف هذا المشروع إلى تطوير تطبيق ذكي لسرد القصص مُصمم خصيصًا للأطفال المصابين باضطراب طيف التوحد. انطلاقًا من فهمه للتحديات الاجتماعية والعاطفية التي يواجهها هؤلاء الأطفال، يُقدم النظام توصيات قصصية مُخصصة، ويُنتج قصصًا جديدة مُصممة لدعم نموهم.</p>
            <p className="text-gray-800 leading-relaxed mb-4">باستخدام تقنيات البرمجة اللغوية العصبية، مثل تحليل المشاعر، واكتشاف السمات العاطفية، وتقييم تعقيد اللغة، يُطابق التطبيق القصص مع الحالة العاطفية لكل طفل ومستوى فهمه. كما يُنتج قصصًا أصلية تُعالج مواقف اجتماعية ومهارات عاطفية مُحددة.</p>
            <p className="text-gray-800 leading-relaxed mb-4">الهدف هو تعزيز التواصل والفهم العاطفي والتفاعل الاجتماعي لدى الأطفال المصابين بالتوحد من خلال تقديم محتوى قصصي جذاب ومُكيف.</p>
            <p className="text-gray-800 leading-relaxed">تهدف هذه الأداة إلى دعم مُقدمي الرعاية والمُعلمين والمعالجين في خلق تجارب تعليمية أكثر شمولًا وفعالية.</p>
          </div>

          {/* Page 3: الدافع */}
          <div className="h-full p-8 bg-gradient-to-b from-amber-100 to-pink-100 border-2 border-emerald-700 rounded-lg shadow-lg overflow-y-auto text-right">
            <h1 className="text-2xl font-bold text-black mb-4">الدافع</h1>
            <p className="text-gray-800 leading-relaxed mb-4">غالبًا ما يواجه الأطفال المصابون باضطراب طيف التوحد (ASD) تحديات في التواصل، وتنظيم المشاعر، والتفاعل الاجتماعي. قد لا تُلبّي الأدوات التعليمية التقليدية وأساليب سرد القصص احتياجاتهم التعليمية الفريدة بالكامل، مما يُصعّب عليهم التفاعل مع المحتوى بطريقة هادفة. مع ذلك، أثبت سرد القصص فعاليته في تعليم المهارات الاجتماعية والعاطفية، عند تكييفه بشكل مناسب.</p>
            <p className="text-gray-800 leading-relaxed mb-4">ينبع هذا المشروع من الحاجة إلى سد الفجوة بين سرد القصص التقليدي والاحتياجات الخاصة للأطفال المصابين بالتوحد. باستخدام الذكاء الاصطناعي ومعالجة اللغة الطبيعية، نهدف إلى إنشاء نظام يُمكنه اقتراح وإنشاء قصص مُخصصة بناءً على الحالة العاطفية لكل طفل واهتماماته ومستوى فهمه.</p>
            <p className="text-gray-800 leading-relaxed">لا يقتصر هدفنا على دعم التعلم فحسب، بل يشمل أيضًا تعزيز الثقة والتعاطف والفهم الاجتماعي لدى الأطفال المصابين بالتوحد. يطمح المشروع إلى تزويد العائلات والمعلمين والمعالجين بأداة هادفة تُمكّن الأطفال ذوي التنوع العصبي من التواصل مع العالم من خلال قصص مُصممة خصيصًا لهم.</p>
          </div>

          {/* Page 4: Statistics */}
          <div className="h-full p-8 bg-gradient-to-b from-amber-100 to-pink-100 border-2 border-emerald-700 rounded-lg shadow-lg overflow-y-auto text-right">
            <h1 className="text-2xl font-bold text-black mb-4">إحصائيات حول اضطراب طيف التوحد</h1>
            <ul className="space-y-4 text-gray-800 leading-relaxed list-disc list-inside">
              <li>حوالي 1 من كل 31 طفلًا في الولايات المتحدة يُشَص باضطراب طيف التوحد (ASD) في سن 8 سنوات، وفقًا لبيانات مراكز السيطرة على الأمراض والوقاية منها لعام 2025.</li>
              <li>زادت معدلات الإصابة بـASD من 1 من كل 36 إلى 1 من كل 31 طفلًا، مما يشير إلى ارتفاع ملحوظ في التشخيصات.</li>
              <li>حوالي 1 من كل 45 بالغًا في الولايات المتحدة لديه ASD، مع زيادة في التشخيصات بنسبة 300% خلال العقود الـ20 الماضية.</li>
            </ul>
          </div>

          {/* Page 5: Team */}
          <div className="h-full p-8 bg-gradient-to-b from-amber-100 to-pink-100 border-2 border-emerald-700 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold text-black mb-6 text-right mx-auto max-w-full">فريقنا</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
              {[
                { name: 'اسماعيل', role: 'مطور ويب وذكاء اصطناعي', photo: 'https://media.licdn.com/dms/image/v2/D4D03AQH7fQVN-UEbFA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721460589478?e=1762992000&v=beta&t=BWWZVTEk2OXbpJEZroEKeuF1oKUufFLVXLlavK-EHsA', linkedin: 'https://www.linkedin.com/in/ismail-saleh-510030245/' },
                { name: 'جود', role: 'مطور ويب وذكاء اصطناعي', photo: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', linkedin: 'https://www.linkedin.com/in/joud-man-a-14a75a296/' },
                { name: 'صبا', role: 'مطور ويب وذكاء اصطناعي', photo: 'https://media.licdn.com/dms/image/v2/D5603AQGx_dB2VJPlAQ/profile-displayphoto-shrink_400_400/B56ZTcY.WpGQAk-/0/1738864324761?e=1762992000&v=beta&t=Ls58gEAWa_3HQh-W3zkHGd8ZbT0TWrIML7GtvMLmVbk', linkedin: 'https://www.linkedin.com/in/saba-ziad-44946a291/' },
              ].map((member, idx) => (
                <div key={idx} className="border border-gray-300 rounded-lg p-4 bg-white/50 w-32">
                  <img src={member.photo} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-2 object-cover" />
                  <h3 className="font-bold text-black mb-1 text-xs">{member.name}</h3>
                  <p className="text-gray-600 text-xs mb-2">{member.role}</p>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-emerald-900 font-bold hover:underline text-xs">LinkedIn</a>
                </div>
              ))}
            </div>
          </div>

          {/* Page 6: Final Image */}
          <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-amber-100 to-pink-100 border-2 border-emerald-700 rounded-lg shadow-lg text-center">
            <img 
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Final" 
              className="w-full max-w-md h-[60%] object-cover rounded mb-4 shadow-md" 
            />
            <h1 className="text-3xl font-bold text-black">معًا نحو عالم أفضل للأطفال</h1>
          </div>
        </HTMLFlipBook>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center max-w-2xl mx-auto px-4">
        <p className="text-2sm text-emerald-900 italic leading-relaxed">
          الطَّيف صُمّم خصيصًا للأطفال من طيف التوحّد، ليمنحهم تجربة سردية هادئة، ممتعة، وقابلة للتخصيص حسب اهتماماتهم واحتياجاتهم. لكل طفل طريقته في عيش القصة، ونحن هنا لنرافقه.
        </p>
          <span>
          <Link
            to="/"
            className="text-amber-700 hover:text-emerald-700 text-sm underline"
          >
            العودة الى الصفحة الرئيسية
          </Link>
        </span>
      </div>
    </div>
  );
};

export default AboutPage;