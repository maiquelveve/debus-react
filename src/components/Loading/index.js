import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@material-ui/core';
import {  makeStyles, withStyles } from '@material-ui/core/styles';

import './styles.css'

//Exporta uma bolinha de loading que realmente eh loading pq a api ainda não respondeu, gira continuamente
export const Loading = (props) => {
    return(
        <div className="loading_circular">
            <FacebookProgress {...props} />
            <p>Carregando....</p>
        </div>
    )
}

//Exporta uma bolinha de loading que vai completando mas ela eh só para ficar bonitinho
export function ExibirLoadingLayout(props) {
    const[exibirLoading, setExibirLoading] = useState(true)

    if(exibirLoading) {
        setTimeout(() => setExibirLoading(false), 1500)
        return(
            <div className="loading_circular">
                <LoadingCircularCompletando {...props} />
                <p>Carregando....</p>
            </div>
        )
    } else {
      return null
    }
}

/**************************************************************/
/**************************************************************/
/*Inicio da parte que cuida do design das bolinhas do loading */
/**************************************************************/

//Loading que vai completando devagar - INICIO
function LoadingCircularCompletando(props) {
    const classes = useStyles();
    const [completed, setCompleted] = React.useState(0);
  
    useEffect(() => {
      function progress() {
        setCompleted((prevCompleted) => (prevCompleted >= 100 ? 100 : prevCompleted + 10));
      }
  
      const timer = setInterval(progress, 100);
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    return (
      <div className={classes.root}>
        <ColorCircularProgress variant="static" value={completed} {...props} />
      </div>
    );
}

const ColorCircularProgress = withStyles({
    root: {
      color: '#007bff',//AZUL IGUAL AO MENU
    }
})(CircularProgress);
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
}));
//Loading que vai completando devagar - FINAL

//Loading que eh tipo o do FACEBOOK - INICIO  
function FacebookProgress(props) {
    const classes = useStylesFacebook();
    return (
        <div className={classes.root}>
            <CircularProgress
                variant="determinate"
                value={100}
                className={classes.top}
                thickness={4}
                {...props}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.bottom}
                thickness={4}
                {...props}
            />
        </div>
    );
}
const useStylesFacebook = makeStyles({
    root: {
      position: 'relative',
    },
    top: {
      color: '#eef3fd',
    },
    bottom: {
      color: '#6798e5',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
    },
});
//Loading que eh tipo o do FACEBOOK - FINAL


//Loading que eh tipo o do FACEBOOK para os MENUS
const useStylesFacebookMenus = makeStyles((theme) => ({
  root: {
      position: 'relative',
  },
  bottom: {
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
      color: '#1a90ff',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
  },
  circle: {
      strokeLinecap: 'round',
  },
}));

export function FacebookProgressMenus(props) {
  const classes = useStylesFacebookMenus();

  return (
      <div className={classes.root}>
          <CircularProgress
              variant="determinate"
              className={classes.bottom}
              size={40}
              thickness={4}
              {...props}
              value={100}
          />
          <CircularProgress
              variant="indeterminate"
              disableShrink
              className={classes.top}
              classes={{
              circle: classes.circle,
              }}
              size={40}
              thickness={4}
              {...props}
          />
      </div>
  );
}

//Loading que eh tipo o do FACEBOOK para os Pesquisas
const useStylesFacebookPesquisas = makeStyles((theme) => ({
  top: {
      color: '#1a90ff',
      animationDuration: '550ms',
      position: 'relative',
      left: 0,
  },
}));

export function FacebookProgressPesquisa(props) {
  const classes = useStylesFacebookPesquisas();

  return (
      <>
        <div>
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.top}
                size={40}
                thickness={4}
                {...props}
            />
        </div>
        <p>Procurando....</p>
      </>
  );
}

//Loading que eh tipo o do FACEBOOK para os SIMPLE 
const useStylesFacebookSimple = makeStyles((theme) => ({
  top: {
      color: '#1a90ff',
      animationDuration: '550ms',
      position: 'relative',
      left: 0,
  },
}));

export function FacebookProgressSimple(props) {
  const classes = useStylesFacebookSimple();

  return (
    <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        size={40}
        thickness={4}
        {...props}
    />
  );
}