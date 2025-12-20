"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BioPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [profileText, setProfileText] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [tempText, setTempText] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // 追加：タブ切り替え用の状態 ("followers" または "following")
    const [activeTab, setActiveTab] = useState<"followers" | "following">("followers");
    
    // Supabaseデータ（フォロワーを追加）
    const [supabaseData, setSupabaseData] = useState<{follows: any[], followers: any[], likes: any[]}>({ 
        follows: [], 
        followers: [], 
        likes: [] 
    });

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (!savedUser) { router.push("/"); return; }
        const user = JSON.parse(savedUser);
        setUsername(user.id);
        setProfileText(user.profileText || "自己紹介が未設定です。");

        fetch(`http://localhost:3001/user-details/${user.id}`)
            .then(res => res.json())
            .then(data => setSupabaseData(data))
            .catch(err => console.error(err));
    }, [router]);

    // handleSave等の既存ロジックはそのまま維持
    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("http://localhost:3001/update-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: username, profileText: tempText }),
            });
            if (res.ok) {
                setProfileText(tempText);
                const user = JSON.parse(localStorage.getItem("user") || "{}");
                localStorage.setItem("user", JSON.stringify({ ...user, profileText: tempText }));
                setIsEditing(false);
            }
        } finally { setIsSaving(false); }
    };

    if (!username) return <div className="min-h-screen bg-[#0a0a0a]" />;

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white p-4 md:p-12 font-sans overflow-x-hidden">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                
                {/* --- 左カラム: プロフィール (既存) --- */}
                <section className="bg-[#121212] rounded-2xl p-6 border border-white/5 shadow-2xl flex flex-col items-center">
                    <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-tr from-red-900 to-black p-0.5 border border-red-500/30 flex items-center justify-center">
                        <span className="text-2xl font-black text-red-600">{username[0]?.toUpperCase()}</span>
                    </div>
                    <h2 className="text-lg font-bold tracking-tighter">{username}</h2>
                    <p className="text-[9px] text-red-500 font-bold tracking-widest mt-1 mb-4 uppercase">SYSTEM ADMIN • SENIOR</p>
                    
                    <div className="w-full bg-white/5 rounded-lg py-1 px-3 mb-6 flex items-center gap-2 border border-white/5">
                        <span className="text-pink-500 text-[10px]">●</span>
                        <span className="text-[10px] font-bold text-pink-500 tracking-tighter">特別会員 (PRO)</span>
                    </div>

                    <div className="text-left w-full space-y-4">
                        {isEditing ? (
                            <div className="space-y-2">
                                <textarea value={tempText} onChange={(e) => setTempText(e.target.value)} className="w-full bg-black border border-red-900/50 text-xs p-2 rounded focus:outline-none" rows={3}/>
                                <button onClick={handleSave} className="w-full py-1 bg-red-600 text-[10px] font-bold rounded">SAVE</button>
                            </div>
                        ) : (
                            <p className="text-[11px] text-gray-400 leading-relaxed cursor-pointer" onClick={() => {setTempText(profileText); setIsEditing(true);}}>
                                {profileText}
                            </p>
                        )}
                        
                        <div className="grid grid-cols-3 border-t border-white/5 pt-4 text-center">
                            <div><div className="text-xs font-bold">234</div><div className="text-[8px] text-gray-500">投稿</div></div>
                            <div><div className="text-xs font-bold">{supabaseData.followers.length}</div><div className="text-[8px] text-gray-500">フォロワー</div></div>
                            <div><div className="text-xs font-bold">{supabaseData.follows.length}</div><div className="text-[8px] text-gray-500">フォロー</div></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 w-full gap-2 mt-6">
                        <button className="bg-red-600 text-[10px] font-bold py-2 rounded-lg">フォロー</button>
                        <button className="bg-white text-black text-[10px] font-bold py-2 rounded-lg">メッセージ</button>
                    </div>
                </section>

                {/* --- 中央カラム: フォロー・フォロワー切り替え --- */}
                <section className="bg-[#121212] rounded-2xl border border-white/5 flex flex-col h-[500px] shadow-2xl overflow-hidden">
                    <div className="p-4 border-b border-white/5 flex flex-col gap-3">
                        <h3 className="text-[11px] font-bold text-gray-400">フォロー・フォロワー</h3>
                        {/* タブ切り替えボタン */}
                        <div className="flex bg-white/5 p-1 rounded-lg">
                            <button 
                                onClick={() => setActiveTab("followers")}
                                className={`flex-1 text-[10px] font-bold py-1.5 rounded-md transition-all ${activeTab === "followers" ? "bg-red-600 text-white shadow-lg shadow-red-600/20" : "text-gray-500 hover:text-gray-300"}`}
                            >
                                フォロワー
                            </button>
                            <button 
                                onClick={() => setActiveTab("following")}
                                className={`flex-1 text-[10px] font-bold py-1.5 rounded-md transition-all ${activeTab === "following" ? "bg-red-600 text-white shadow-lg shadow-red-600/20" : "text-gray-500 hover:text-gray-300"}`}
                            >
                                フォロー中
                            </button>
                        </div>
                    </div>

                    {/* リスト表示部分：activeTabによって出すデータを変える */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800">
                        {(activeTab === "followers" ? supabaseData.followers : supabaseData.follows).map((item, i) => (
                            <div key={i} className="flex items-center justify-between group animate-fadeIn">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gray-800 border border-white/5 overflow-hidden">
                                        <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${item.follower_id || item.following_id}`} alt="" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold">{item.following_name || item.follower_id || "USER"}</div>
                                        <div className="text-[9px] text-gray-500">@{item.follower_id || item.following_id}</div>
                                    </div>
                                </div>
                                <button className="text-[9px] font-bold px-3 py-1.5 rounded-lg bg-red-600 border border-red-500 shadow-sm">フォロー</button>
                            </div>
                        ))}
                        {/* データが空の場合の表示 */}
                        {(activeTab === "followers" ? supabaseData.followers : supabaseData.follows).length === 0 && (
                            <p className="text-[10px] text-gray-600 text-center mt-10">データが存在しません</p>
                        )}
                    </div>
                </section>

                {/* --- 右カラム: いいね投稿 (既存) --- */}
                <section className="bg-[#121212] rounded-2xl border border-white/5 flex flex-col h-[500px] shadow-2xl overflow-hidden">
                    <div className="p-4 border-b border-white/5">
                        <h3 className="text-[11px] font-bold text-gray-400">いいねした投稿</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-800">
                        <div className="grid grid-cols-2 gap-2">
                            {supabaseData.likes.map((l, i) => (
                                <div key={i} className="aspect-square bg-gray-900 rounded-lg overflow-hidden border border-white/5 group">
                                    <img src={l.image_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" alt="liked" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
            
            <footer className="mt-12 text-center">
                <button onClick={() => router.push("/")} className="text-[10px] text-gray-600 tracking-widest hover:text-red-500 transition-colors">
                    ← TERMINAL
                </button>
            </footer>
        </div>
    );
}