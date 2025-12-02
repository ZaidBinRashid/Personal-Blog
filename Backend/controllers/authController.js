export const adminLogin = async (req, res) => {
    try {
        res.send("Welcome Admin")
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "UnAuthorized!!"}) 
    }
}