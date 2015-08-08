var path=require('path');

//Cargar Modelo ORM
var Sequelize=require('sequelize');

//Usar BBDD SQLite:
var sequelize = new Sequelize(null,null,null,
	{dialect:"sqlite",storage:"quiz.sqlite"});

//Importar la definicion de la tabla Quiz e quiz.js
var Quiz=sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz=Quiz;//exportar deinicion de tabla Quiz

//sequelize.sync() crea e inicializa tabla de preguntas en BD
sequelize.sync().then(function(){
	Quiz.count().then(function(count){
		if(count===0){//la tabla se inicializa solo si esta vacia
			Quiz.create({pregunta:'Capital de Italia',
				respuesta:'Roma'})
			.then(function(){console.log('Base de datos inicializada')});
		};
	});
});

