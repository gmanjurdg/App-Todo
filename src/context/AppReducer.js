export default (state, action) => {
    switch (action.type) {
        case 'REMOVE_EMPLOYEE':
            console.log("id",action.payload);
            console.log("id",state.employees);
            fetch("https://jsonplaceholder.typicode.com/users/"+action.payload,{
                method:"DELETE"
            })
            .then(response=>response.json())
            .then(data=>{
            return {
                ...state,
                employees: state.employees.filter(employee => employee.id !== action.payload)
            };
            })
        case 'ADD_EMPLOYEES':
            return {
                ...state,
                employees: [...state.employees, action.payload]
            };
        case 'EDIT_EMPLOYEE':
            const updatedEmployee = action.payload;
            const updatedEmployees = state.employees.map(employee => {
                if (employee.id === updatedEmployee.id) {
                    return updatedEmployee;
                }
                return employee;
            });
            return {
                ...state,
                employees: updatedEmployees
            };
        default: return state;
    }
}