/*
    only login and register api calls are here the rest will be in individual pages
*/

export const loginUser = async (email: string, password: string) => {
    if(!email || !password){
        alert("Please fill in all fields");
        return null;
    };
    try{
        const response = await fetch('https://mycontactsservercode.onrender.com/api/users/login',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                password: password,
              }),
        });
        if(response.status === 401){
            alert("Invalid credentials");
            return null;
        }
        const data = await response.json();
        return data ;
    } catch (error) {
        console.error(error);
    }
};


export const registerUser = async (username: string, email: string, password: string) => {
    try{
        const response = await fetch('https://mycontactsservercode.onrender.com/api/users/register',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: username,
                email: email,
                password: password,
              }),
        });
        const data = await response.json();
        const statusCode = response.status;
        return { data, statusCode };
    } catch (error) {
        console.error(error);
    }
};