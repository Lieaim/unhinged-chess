import{createContext,useContext}from'react';
export const boardThemes=['green','ocean','plum','walnut','slate','rose']as const;
export const pieceStyles=['original','classic','neon','woodcut','blueprint']as const;
export type Appearance={theme:string;pieceStyle:string;setTheme:(theme:string)=>void;setPieceStyle:(style:string)=>void};
export const AppearanceContext=createContext<Appearance>({theme:'green',pieceStyle:'original',setTheme:()=>{},setPieceStyle:()=>{}});
export const useAppearance=()=>useContext(AppearanceContext);
