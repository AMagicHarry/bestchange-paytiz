export interface Blog {
    _id: string;      
    user: User;     
    title: string;
    content: string;
    avatar: string;
    createdAt: string; 
    updatedAt: string;  
}


export interface User {
    _id: string;                    
    firstName: string;
    lastName: string;
    avatar: string;
    country: string;
    countryCode?:string;
    userName:string;
    role?: 'user' | 'admin';          
    totalEarnings?: number;
    totalWithdrawal?: number;
    availableForWithdrawal?: number;
    referrals?: Referral[];
    createdAt?: string;                 
    updatedAt?: string;                
}


export interface Referral {
    _id:string;
    referrer:User,
    referred:User,
    createdAt:string;
    updatedAt:string;
}


export interface Exchanger {
    _id: string;                          
    user: User;                        
    avatar: string;
    currency:{
        code:string;
        name:string;
        symbol?:string;
    };
    website: string;                    
    name: string;
    rating: number;                      
    rateRange: {
        min: number;
        max: number;
    };
    siteOn: boolean;
    isActive: boolean;
    verified: boolean;              
    legalRegistration: boolean;       
    createdAt?: string;           
    updatedAt?: string;      
}


export interface ExchangerSummary {
    _id:string
    title:string;
    total: number;
    stat:{currentMonth:{_id:string,count:number}[],previousMonth:{_id:string,count:number}[]},
    status:boolean;
}

export interface Review {
    _id:string;
    user: User;
    content: string;
    rating?: number; 
    createdAt?: string;           
    updatedAt?: string;  

  }
  
