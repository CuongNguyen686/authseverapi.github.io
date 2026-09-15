import {createContext,useContext,useEffect,useMemo,useState} from 'react';
import {api} from '../services/api';
const C=createContext(null);
export function Store({children}){
 const [theme,setTheme]=useState(localStorage.getItem('theme')||'dark');
 const [accent,setAccent]=useState(localStorage.getItem('accent')||'#ff3d91');
 const [displayName,setDisplayName]=useState(localStorage.getItem('display-name')||'Developer');
 const [toast,setToast]=useState(null);
 useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.style.setProperty('--accent',accent);localStorage.setItem('theme',theme);localStorage.setItem('accent',accent)},[theme,accent]);
 useEffect(()=>{localStorage.setItem('display-name',displayName)},[displayName]);
 const notify=(type,message)=>{setToast({type,message});window.clearTimeout(window.__toastTimer);window.__toastTimer=window.setTimeout(()=>setToast(null),2800)};
 const saveProfile=async name=>{const clean=name.trim()||'Developer';setDisplayName(clean);await api.saveSettings({displayName:clean});notify('success','Đã lưu thông tin hiển thị')};
 const value=useMemo(()=>({theme,setTheme,accent,setAccent,displayName,setDisplayName,saveProfile,toast,notify}),[theme,accent,displayName,toast]);
 return <C.Provider value={value}>{children}</C.Provider>
}
export const useStore=()=>useContext(C);
