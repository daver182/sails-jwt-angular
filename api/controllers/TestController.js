/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	restricted: function(req, res){
		res.json([
			{id: 1, title: 'contenido de prueba 1'},
			{id: 2, title: 'contenido de prueba 1'}
		]);
	}
};

