import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import ViagemVisualizada from './viagemVisualizada';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        background: '#007bff'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function Visualizar({open, setOpen, viagemId}) {
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar} >
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Viagem
                        </Typography>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close"> 
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <ViagemVisualizada id={viagemId} />                
            </Dialog>
        </div>
    );
}