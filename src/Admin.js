import React from 'react';
import './Admin.css';

const propTypes = {};

const defaultProps = {};

function Admin() {
    const [checkedAdmin, setCheckedAdmin] = React.useState(false);
    const [checkedInstructor, setCheckedInstructor] = React.useState(false);
    const [checkedTrainee, setCheckedTrainee] = React.useState(false);
    
    return (
        <div>
            <form>
                <label>
                    Username:
                    <input type="text" name="name" />
                </label>
                <label>
                    Password:
                    <input type="password" name="name" />
                </label>

                <label><input type="checkbox" />New Admin</label>
                <label><input type="checkbox" />New Instructor</label>  
                <label><input type="checkbox" />New Corporate Trainee</label>

                <input type="submit" value="Submit" />
            </form>
        </div>
     );
  }

Admin.propTypes = propTypes;
Admin.defaultProps = defaultProps;

export default Admin;