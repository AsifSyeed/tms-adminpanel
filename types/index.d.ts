
export { BaseButtonProps };

declare global {
    const enum BaseButtonType{
        "FILL",
        "OUTLINE"
    }
    
    interface BaseButtonProps {
        type:BaseButtonType;
        onClick:()=>void;
        title:string;
        disabled?:boolean;
    }
    
    interface BaseInputTextProps {
        id:string;
        label?:string;
        placeholder?:string;
        error?:string;
        modelValue:any;
        readonly?:boolean
    }
    
    interface BaseSelectInputProps {
        id:string;
        label?:string;
        placeholder?:string;
        error?:string;
        modelValue:any;
        colors:boolean;
        options:{
            label:string;
            value:string;
        }[];
    }
}

