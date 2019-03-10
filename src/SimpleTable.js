import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';

const styles = theme => ({
    root: {
        width: '80%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    search: {
        float: 'right',
        marginRight: '50px',
        marginBottom: '20px'
    },
    iconButton: {
        padding: 10,
        marginTop: '30px'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});

let id = 0;

function createData(name, calories, fat, carbs, protein, type) {
    id += 1;
    return {id, name, calories, fat, carbs, protein, type};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0,'light'),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 'medium'),
    createData('Eclair', 262, 16.0, 24, 6.0, 'light'),
    createData('Cupcake', 305, 3.7, 67, 4.3, 'heavy'),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 'medium'),
];

class SimpleTable extends Component {
    state = {
        searchTerm: '',
        data: rows
    };

    filterItems = (query) => {
        return rows.filter(function(el) {
            return (
                el.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
                el.type.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
        })
    }

    handleChange = name => event => {
        const data = this.filterItems(event.target.value);
        this.setState({
            searchTerm: event.target.value,
            data
        });
    };

    render() {
        const {classes} = this.props;
        const {data} = this.state;

        return (
            <Paper className={classes.root}>
                <div className={classes.search}>
                    <TextField
                        id="standard-search"
                        label="Search"
                        type="search"
                        className={classes.textField}
                        margin="normal"
                        value={this.state.searchTerm}
                        onChange={this.handleChange('searchTerm')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat (g)</TableCell>
                                <TableCell align="right">Carbs (g)</TableCell>
                                <TableCell align="right">Protein (g)</TableCell>
                                <TableCell align="right">Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                    <TableCell align="right">{row.type}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        )
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);