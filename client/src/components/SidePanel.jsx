// SidePanel.jsx
import bgImage from "../assets/background.png"; // your illustration

export default function SidePanel() {
  return (
    <div
      className="w-1/2 bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Optional overlay if you want a faded look */}
      {/* <div className="bg-white/60 absolute inset-0"></div> */}
    </div>
  );
}
