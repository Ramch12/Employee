const getConnection = require('../db/con_mysql');
const validate = require('../validate/validate');
const asyncHandler = require('../utils/asyncHandler');

exports.create_emp = asyncHandler(async (req, res, next) => {

    const { error, value } = validate(req.body);

    if (error) return res.status(401).json({ status: 0, message: error.details[0].message });

    const { name, gender, date_of_birth, designation, salary, email, phone_no, address } = value;
    const dbserver = await getConnection();
    const [result] = await dbserver.query("insert into employee(name,gender,date_of_birth,designation,salary) values(?)", [[name, gender, date_of_birth, designation, salary]]);


    let employee_id = result.insertId;

    if (employee_id) {
        const [result1] = await dbserver.query('insert into contact_details(employee_id,email,phone_no,address) values(?)', [[employee_id, email, phone_no, address]]);
    }

    res.status(201).json({ status: 1, message: "employee successfully created" });

})





exports.get_page = asyncHandler(async (req, res, next) => {
    const { page, limit } = req.query;
    let page1 = parseInt(page);
    let limit1 = parseInt(limit);
    let offset = (page1 - 1) * limit;
    const dbserver = await getConnection();
    const [result] = await dbserver.query('select * from contact_details limit ?,?', [offset, limit1]);
    res.status(200).send(result);
});




exports.get_emp = asyncHandler(async (req, res, next) => {
    const id  = parseInt(req.params.id);
    const dbserver = await getConnection()
    const [result] = await dbserver.query('select * from employee e inner join contact_details c on e.id=c.employee_id where employee_id=?',[id]);
    if (!result.length) return res.status(404).send({ message: "User not found" });
    res.status(200).json({ status: 1, message: result[0] });
});




exports.update_Emp = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const dbserver = await getConnection();
    const [result] = await dbserver.query("UPDATE employee e \ INNER JOIN contact_details c ON e.id = c.employee_id \ SET e.name = ?, c.email = ? \ WHERE e.id = ?",[name, email, id]);
    if (result.affectedRows === 0) {
      return res.status(404).send("No user found");
    } else {
      return res.status(201).json({ status: 1, message: 'successfully updated' });
    }
  });
  






exports.delete_emp = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const dbserver = await getConnection();
    const [result] = await dbserver.query('delete from employee where id=?', [id]);
    if (!result.affectedRows) return res.status(404).send("No user found to delete");
    return res.status(201).send("successfully deleted");
});



