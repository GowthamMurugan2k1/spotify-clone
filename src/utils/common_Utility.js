import { getCookie } from "cookies-next";

// This func return Greetings according to Time
export const Greetings = ()=>{
    const currentDate = new Date();
    const currentTime = currentDate.getHours();
    if(currentTime < 12 ){
        return "Good morning"
    }else if( currentTime > 12 && currentTime < 16){
        return 'Good afternoon'
    }else if( currentTime >= 16 &&  currentTime < 20 ){
        return 'Good evening'
    }else{
        return 'Good night'
    }
   
}

export function msToDuration(ms) {
    let hours = Math.floor(ms / (1000 * 60 * 60));
    let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((ms % (1000 * 60)) / 1000);
  
    // Format the duration
    let duration = '';
    if (hours > 0) {
      duration += hours + ':';
    }
    duration += (minutes < 10 ? '0' : '') + minutes + ':';
    duration += (seconds < 10 ? '0' : '') + seconds;
    
    return duration;
  }
  

  export function updateFetchOptions(options){
    const update = { ...options };
    const token = getCookie('accesstoken')
    if ( token) {
      update.headers = {
        ...update.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return update;
  }