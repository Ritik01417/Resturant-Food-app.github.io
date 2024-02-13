const testUserController =(req, res)=> {
    try {
        res.status(200).send(
            '<h1>I am testing the Demo Data for user</h1>'
        );
    } catch (error) {
        console.log("error in test API",error)
    }
};

 module.exports={ testUserController};
