import jwt from 'jsonwebtoken'

const authJwt = (req, res, next) => {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if(!token) return res.sendStatus(401)
	jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
		if(err) return res.sendStatus(403)
		req.user = user.user
		next()
	})
}

export default authJwt