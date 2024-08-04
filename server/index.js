const express=require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const app=express();
const cors=require("cors");

const pool =require("./db");
app.use(cors());
app.use(express.json());

app.post("/users/", async (req, res) => {
    try {
        const { username, name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const dbUser = await pool.query("SELECT * FROM users WHERE username=$1",[username]);
    if (dbUser.rows[0] === undefined) {
      const createUserQuery =await pool.query("INSERT INTO users(username, name, password)  VALUES($1,$2,$3) RETURNING *",[username,name,hashedPassword])
      const payload = {
        username: username,
      };
      const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
      res.json({ jwtToken });
    } else {
      res.status = 400;
      res.json("User already exists");
    }
 
  
    } catch (err) {
        console.error(err.message)
    }
  });

  app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const dbUser = await pool.query("SELECT * FROM users WHERE username = $1",[username]);
        if (dbUser.rows[0] === undefined) {
          res.status(400);
          res.json("Invalid User");
        } else {
          const isPasswordMatched = await bcrypt.compare(password, dbUser.rows[0].password);
          if (isPasswordMatched === true) {
            const payload = {
              username: username,
            };
            const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
            res.json({ jwtToken });
          } else {
            res.status(400);
            res.json("Invalid Password");
          }
        }
        
    } catch (err) {
        console.error(err.message) 
    }
   
  });

  const authenticateToken = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"];
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[1];
    }
    if (jwtToken === undefined) {
      response.status(401);
      response.json("Invalid JWT Token");
    } else {
      jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
        if (error) {
          response.status(401);
          response.json("Invalid JWT Token");
        } else {
          next();
        }
      });
    }
  };


app.post("/todos",authenticateToken, async(req,res)=>{
    try{
        const {description}=req.body;
        const newTodo=await pool.query("INSERT INTO todo(description) VALUES($1) RETURNING *",[description]);
        res.json(newTodo.rows[0]);
    }
    catch(err){
        console.log(err.message);
    }
})

app.get ("/todos",authenticateToken,async(req,res)=>{
    try{
        const allTodos=await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    }catch(err){
        console.error(err.message);
    }

})

app.get("/todos/:id",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.params
    const getTodo=await pool.query("SELECT * FROM todo WHERE todo_id=$1",[id])
    res.json(getTodo.rows[0])
        
    } catch (err) {
        console.error(err.message);
    }
    
})

app.put("/todos/:id",authenticateToken, async(req,res)=>{
    try {
        const {id}=req.params
    const {description}=req.body;
    const updateTodo=await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2",[description,id])
    res.json("Todo was updated")
        
    } catch (err) {
        console.error(err.message);
    }
    
})

app.delete("/todos/:id",authenticateToken,async(req,res)=>{
    try {
        const{id}=req.params
        const deleteTodo=await pool.query("DELETE FROM todo WHERE todo_ID=$1",[id])
        res.json("Todo was deleted")
        
    } catch (err) {
        console.error(err.message);

        
    }
})

app.listen(4000,()=>{
    console.log("Server has started running on port 4000");
});