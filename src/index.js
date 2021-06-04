const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const { urlencoded } = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Initializations
const app = express();
require('./database');
require('./config/passport');

//settings
app.set('port',process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    helpers: {//helper para comparaciones
          compare: function (v1, operator, v2, options) { 
            switch (operator) {
              case '==':
                  return (v1 == v2) ? options.fn(this) : options.inverse(this);
              case '===':
                  return (v1 === v2) ? options.fn(this) : options.inverse(this);
              case '!=':
                  return (v1 != v2) ? options.fn(this) : options.inverse(this);
              case '!==':
                  return (v1 !== v2) ? options.fn(this) : options.inverse(this);
              case '<':
                  return (v1 < v2) ? options.fn(this) : options.inverse(this);
              case '<=':
                  return (v1 <= v2) ? options.fn(this) : options.inverse(this);
              case '>':
                  return (v1 > v2) ? options.fn(this) : options.inverse(this);
              case '>=':
                  return (v1 >= v2) ? options.fn(this) : options.inverse(this);
              case '&&':
                  return (v1 && v2) ? options.fn(this) : options.inverse(this);
              case '||':
                  return (v1 || v2) ? options.fn(this) : options.inverse(this);
              default:
                  return options.inverse(this);
          }
        }
    },
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}));

app.set('view engine', '.hbs');

//midelwares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'edgesecret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// routes
app.use(require('./routes/index'));
app.use(require('./routes/orders'));
app.use(require('./routes/users'));


//estatic files
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
    res.render("404");
  });


//Server 

app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
})