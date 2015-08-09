var models=require('../models/models.js');

exports.load=function(req,res,next,quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz=quiz;
				next();				
			}else{next(new Error("No existe quizId="+quizId));}
		}).catch(function(error){next(error);});
};

exports.show=function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{quiz:req.quiz});	
	})	
};

exports.answer=function(req,res){
	var resultado='Incorrecto';
		if(req.query.respuesta===req.quiz.respuesta){
		resultado='Correcto';
	}
	res.render('quizes/answer',{quiz:req.quiz,respuesta:resultado});
		
};

exports.index=function(req,res){
	var search="%%";
	if(req.query.search){
		var s=req.query.search;
		s=s.replace(/ /g,"%");
		search="%"+s+"%";
	}

	models.Quiz.findAll({where:["pregunta like ?",search]}).then(function(quizes){
		res.render('quizes/',{quizes:quizes,req:req});	
	}).catch(function(error){next(error);})
};
