module.exports={
    isOwner:function(req, res){
        if(req.user){
            return true;
        }else{
            return false;
        }
    },
    statusUI:function(req, res){
        var authStatusUI = '<a href="/auth/login">login</a>'
        if(this.isOwner(req, res)){
            console.log('로그인 중')
            authStatusUI = `${req.user.id} | <a href="/auth/logout">logout</a>`;
        }
        return authStatusUI;
    }
};