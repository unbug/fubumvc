/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');

var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Route = Router.Route, DefaultRoute = Router.DefaultRoute,
  Link=Router.Link, RouteHandler = Router.RouteHandler;

var Header = require('./header');
var Dashboard = require('./dashboard');
var {Grid, Col, Row} = require('react-bootstrap');



var App = React.createClass({
  mixins: [Router.State],

  getHandlerKey: function () {
    var childDepth = 1; // assuming App is top-level route
    var key = this.getRoutes()[childDepth].name;
    var id = this.getParams().id;
    if (id) { key += id; }

    var mode = this.getParams().Hash;
    if (mode){
    	key += ':' + mode;
    }

    return key;
  },

	render: function(){
		style = {
			paddingLeft: '25px'
		}
	
		return (
			<Grid fluid={true}>
				<Row>
					<Header />
				</Row>
				<Row  style={style}>
					<RouteHandler key={this.getHandlerKey()}/>
				</Row>
			</Grid>
		);
	}
});






module.exports = {
	start: function(){
		var sectionRoutes = _.flatten(FubuDiagnostics.sections.map(section => section.toRoutes()));

		var routes = (
		  <Route name="app" path="/" handler={App}>
		    <DefaultRoute handler={Dashboard}/>
		    {sectionRoutes}
		  </Route>
		);

		Router.run(routes, function (Handler) {
		  React.render(<Handler/>, document.body);
		});
	}
}
