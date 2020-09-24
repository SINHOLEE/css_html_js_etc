export const math = () => {
    // function sum(a, b){
    //     return a + b;
    // }
    function sum(...nums){
        const numsClone = [...nums]
        return numsClone.reduce((prev, curr)=>{
            return prev + curr;
        }, 0)
    }
    function sub(...nums){
        const numsClone = [...nums]
        let res = numsClone[0];
        for (let i = 1; i<numsClone.length; i++){
            res -= nums[i]; 
        }
        return res;
    }
 
    return {sum, sub}
}
   



