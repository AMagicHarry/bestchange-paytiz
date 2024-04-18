export interface Blog {
    _id: string;      
    user: string;     
    title: string;
    content: string;
    avatar: string;
    createdAt?: Date; 
    updatedAt?: Date;  
}


export interface User {
    _id: string;                    
    firstName: string;
    lastName: string;
    avatar: string;
    country?: string;
    role?: 'user' | 'admin';          
    totalEarnings?: number;
    totalWithdrawal?: number;
    availableForWithdrawal?: number;
    referrals?: Referral[];
    createdAt?: Date;                 
    updatedAt?: Date;                
}


export interface Referral {
    user:User,
    createdAt:string;
    updatedAt:string;
}


export interface Exchanger {
    _id: string;                          
    user: User;                        
    avatar: string;
    website?: string;                    
    name: string;
    rating?: number;                      
    exchangeRate: number;
    rateRange: {
        min: number;
        max: number;
    };
    siteOn: boolean;
    isActive: boolean;
    verified?: boolean;              
    legalRegistration?: boolean;       
    createdAt?: Date;           
    updatedAt?: Date;      
}
