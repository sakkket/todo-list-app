import './App.css';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TodosContent(prop) {
  
  return (
      <Grid container spacing={3}>
      <Grid item xs={8}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={10}>
                <Typography  variant="h6">
                  {prop.value}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton 
                aria-label={prop.value}
                onClick ={(e) => prop.onChildClick(prop.value)}>
                  <HighlightOffIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

function TodosCard(props) {
  const todotext = props.todoText;
  function handleChildClick(todoElem) {
    console.log("in the parents");
    console.log(todoElem)
    props.onChildClick(todoElem);
  }
  const listItems = todotext.map((todostext) =>
    // Correct! Key should be specified inside the array.
    <TodosContent key={todostext.toString()} value={todostext} onChildClick={handleChildClick}/>
  );
  return (
    <div>
       {listItems}
    </div>
  );
}


function App() {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [todosList,setTodosList] = useState([]);
  const [open, setOpen] = useState(false);


  const addEntryClick = () => {
    if(inputValue){
      setTodosList([...todosList, inputValue]);
      setInputValue('');
      setOpen(true);
    }
  }
  const removeTodo = (elem) => {
    console.log("PARENT");
    console.log(elem);
    setTodosList(todosList.filter((e)=>(e !== elem)));
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="App">
      <Container maxWidth="md">
        <div style={{ padding: 20 }} className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
                <TextField 
                  fullWidth id="standard-basic" 
                  autoComplete="off" 
                  label="Todos" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  />
            </Grid>
            <Grid item xs={2}>
            <Button variant="contained" color="primary" onClick={addEntryClick}> Add </Button>
            </Grid>
            </Grid>
            <TodosCard todoText={todosList} onChildClick={removeTodo}/>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Todo task added!
              </Alert>
            </Snackbar>
        </div>  
      </Container>
    </div>
  );
}

export default App;
