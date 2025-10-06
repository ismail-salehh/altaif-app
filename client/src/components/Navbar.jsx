import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-[#113F67] text-white p-4 flex justify-between items-center">
      <div className="font-bold">🌙 الطيف</div>
      <div className="flex items-center gap-4">
        <Link to="/game" className="hover:underline">اللعبة</Link>
        <Link to="/dashboard" className="hover:underline">لوحة القصص</Link>
        <Link to="/library" className="hover:underline">المكتبة</Link>
        <Link to="/about" className="hover:underline">عن التطبيق</Link>

        {user ? (
          <>
            <span className="text-sm">{user.username}</span>
            <button onClick={logout} className="ml-2 bg-white text-[#113F67] px-3 py-1 rounded">خروج</button>
          </>
        ) : (
          <Link to="/" className="bg-white text-[#113F67] px-3 py-1 rounded">دخول / تسجيل</Link>
        )}
      </div>
    </nav>
  );
}
