// import React, { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import api from '../utils/api';
// import { useNavigate } from 'react-router-dom';

// const StoryDashboard = () => {
//   const navigate = useNavigate();
//   const [answers, setAnswers] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentScene, setCurrentScene] = useState(0);

//   // Fetch answers from localStorage (from Game)
//   useEffect(() => {
//     const saved = localStorage.getItem('gameAnswers');
//     if (saved) {
//       setAnswers(JSON.parse(saved));
//       localStorage.removeItem('gameAnswers'); // Clear after use
//     } else {
//       navigate('/game'); // Back if no data
//     }
//   }, [navigate]);

//   // Query for story generation (backend call)
//   const { data: storyData, isLoading, error } = useQuery({
//     queryKey: ['story', answers],
//     queryFn: async () => {
//       if (!answers) throw new Error('No answers');
//       const res = await api.post('/api/story/generate', { answers });
//       return res.data; // { storyText, scenes: [{imageUrl, text}], audioUrl? }
//     },
//     enabled: !!answers, // Only run if answers exist
//     retry: 1,
//   });

//   // TTS with Web Speech API (Arabic support)
//   const speakStory = () => {
//     if (!storyData || isPlaying) return;
    
//     const utterance = new SpeechSynthesisUtterance(storyData.storyText);
//     utterance.lang = 'ar-SA'; // Arabic
//     utterance.rate = 0.8; // Slower for kids
//     utterance.pitch = 1.2; // Higher pitch
    
//     // Sync with scenes (advance every ~5-10s or on word boundaries—simple timer here)
//     let sceneInterval;
//     if (storyData.scenes && storyData.scenes.length > 1) {
//       sceneInterval = setInterval(() => {
//         setCurrentScene((prev) => (prev + 1) % storyData.scenes.length);
//       }, 5000); // 5s per scene
//     }
    
//     utterance.onend = () => {
//       setIsPlaying(false);
//       if (sceneInterval) clearInterval(sceneInterval);
//     };
    
//     speechSynthesis.speak(utterance);
//     setIsPlaying(true);
//   };

//   if (isLoading || !answers) return <div className="flex items-center justify-center min-h-screen">جاري إنشاء قصتك...</div>;
//   if (error) return (
//     <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
//       خطأ في إنشاء القصة: {error.message}. <button onClick={() => window.location.reload()}>إعادة المحاولة</button>
//     </div>
//   );

//   const { storyText, scenes = [] } = storyData; // scenes: [{imageUrl, text: paragraph}]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
//       <Navbar />
      
//       <div className="max-w-4xl mx-auto mt-8 space-y-6">
//         {/* Play Button */}
//         <div className="text-center">
//           <button
//             onClick={speakStory}
//             disabled={isPlaying}
//             className="bg-emerald-500 text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-emerald-600 disabled:opacity-50 transition"
//           >
//             {isPlaying ? 'جاري التشغيل...' : 'شغّل القصة'}
//           </button>
//         </div>

//         {/* Story Display */}
//         <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 animate-fade-in">
//           <h1 className="text-4xl md:text-5xl font-bold text-teal-600 text-center mb-6">هذه هي قصتك!</h1>
          
//           {/* Image Carousel */}
//           <div className="relative overflow-hidden rounded-2xl mb-6">
//             <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentScene * 100}%)` }}>
//               {scenes.map((scene, idx) => (
//                 <div key={idx} className="w-full flex-shrink-0">
//                   <img src={scene.imageUrl} alt={`Scene ${idx + 1}`} className="w-full h-64 object-cover rounded-lg" />
//                   <p className="text-center text-gray-700 mt-2">{scene.text}</p>
//                 </div>
//               ))}
//             </div>
//             {scenes.length > 1 && (
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                 {scenes.map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setCurrentScene(idx)}
//                     className={`w-3 h-3 rounded-full ${idx === currentScene ? 'bg-teal-600' : 'bg-gray-300'}`}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Full Story Text */}
//           <div className="prose max-w-none text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
//             {storyText}
//           </div>

//           {/* Restart */}
//           <div className="text-center mt-10">
//             <button
//               onClick={() => navigate('/game')}
//               className="flex items-center gap-3 mx-auto bg-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-orange-600 transition-transform transform hover:scale-105"
//             >
//               🔄 العب مرة أخرى
//             </button>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
//         .animate-fade-in { animation: fade-in 0.6s ease-out; }
//       `}</style>
//     </div>
//   );
// };

// export default StoryDashboard;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const StoryDashboard = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);

  const mockStory = {
    storyText: `كان يا ما كان، في قديم الزمان، طفل صغير يُدعى أحمد يعيش في قرية خضراء مليئة بالزهور الملونة. أحمد كان يحب المغامرات، لكنه يخاف قليلاً من الظلام. ذات يوم، وجد صندوقاً قديماً في حديقة الجدة، مليئاً بخرائط سحرية تؤدي إلى كنوز مخفية. لكن الخريطة الأولى كانت تطلب منه عبور غابة مظلمة. شعر أحمد بالخوف، لكنه تذكر كلمات جدته: "الصداقة تضيء الطريق". التقى بأرنب صغير يدعى زيزو، الذي كان خائفاً أيضاً، فصارا صديقين. معاً، استخدما مصباحاً سحرياً من الصندوق ليضآ الغابة. في الغابة، واجها تحديات مثل نهر واسع، لكنهما بنيا جسرًا من الأغصان بمساعدة بعض الطيور الودودة. تعلم أحمد أن الخوف يقل عندما نشارك الآخرين. وصلا أخيراً إلى الكنز: صندوق مليء بكتب قصصية تتحدث عن الشجاعة والصداقة. عاد أحمد إلى القرية سعيداً، يروي قصته لأصدقائه، وأصبح يساعد الجميع في مغامراتهم. ومن يومها، عرف أن الصداقة هي أعظم كنوز العالم. وإلى الأبد عاشوا في سعادة، ينتظرون مغامرات جديدة.`,
    scenes: [
      {
        imageUrl: 'https://images.pexels.com/photos/764681/pexels-photo-764681.jpeg?auto=compress&cs=tinysrgb&w=1200',
        text: 'كان يا ما كان... أحمد يجد الصندوق.',
      },
      {
        imageUrl: 'https://images.pexels.com/photos/1587091/pexels-photo-1587091.jpeg?auto=compress&cs=tinysrgb&w=1200',
        text: 'يلتقي بزيزو ويضآ الغابة.',
      },
      {
        imageUrl: 'https://images.pexels.com/photos/1157399/pexels-photo-1157399.jpeg?auto=compress&cs=tinysrgb&w=1200',
        text: 'يبنيان الجسر مع الطيور.',
      },
      {
        imageUrl: 'https://images.pexels.com/photos/1304645/pexels-photo-1304645.jpeg?auto=compress&cs=tinysrgb&w=1200',
        text: 'يجد الكنز ويعود سعيداً.',
      },
    ],
  };

  const speakStory = () => {
    if (!mockStory || isPlaying) return;

    setCurrentScene(0);
    const utterance = new SpeechSynthesisUtterance(mockStory.storyText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;

    const interval = setInterval(() => {
      setCurrentScene((prev) => {
        if (prev < mockStory.scenes.length - 1) return prev + 1;
        return prev;
      });
    }, 5000);

    utterance.onend = () => {
      clearInterval(interval);
      setIsPlaying(false);
    };

    speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  return (
    <div
      className="relative w-full h-full bg-gradient-to-br from-emerald-50 to-teal-50 "
      dir="rtl"
    >
      <Navbar />

      <div className="w-full max-w-5xl mx-auto mt-6 md:mt-10 flex flex-col">
        
        {/* BUTTON */}
        <div className="text-center mb-4">
          <button
            onClick={speakStory}
            disabled={isPlaying}
            className="bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-xl hover:bg-emerald-600 disabled:opacity-50"
          >
            {isPlaying ? 'جاري التشغيل...' : 'شغّل القصة'}
          </button>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8 overflow-y-auto h-full animate-fade-in">

          <h1 className="text-4xl font-bold text-teal-600 text-center mb-6">
            هذه هي قصتك!
          </h1>

          {/* IMAGE CAROUSEL */}
          <div className="relative overflow-hidden rounded-2xl mb-6 w-full h-[45vh]">
            <div
              className="flex transition-transform duration-500 h-full"
              style={{ transform: `translateX(-${currentScene * 100}%)` }}
            >
              {mockStory.scenes.map((scene, i) => (
                <div key={i} className="w-full flex-shrink-0 h-full">
                  <img
                    src={scene.imageUrl}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <p className="text-center text-gray-700 mt-2 italic text-sm">
                    {scene.text}
                  </p>
                </div>
              ))}
            </div>

            {/* DOTS */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
              {mockStory.scenes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentScene(i)}
                  className={`w-3 h-3 rounded-full ${
                    i === currentScene ? 'bg-teal-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* STORY TEXT */}
          <div className="text-gray-700 leading-relaxed text-right whitespace-pre-wrap mb-8">
            {mockStory.storyText}
          </div>

          {/* RESTART */}
          <div className="text-center">
            <button
              onClick={() => navigate('/game')}
              className="bg-orange-500 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-orange-600 transform hover:scale-105"
            >
              🔄 العب مرة أخرى
            </button>
          </div>
        </div>
      </div>

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StoryDashboard;
