-- Create Batches Table

SELECT table_name FROM user_tables;

CREATE TABLE batches (
    batch_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL
);

-- Create Students Table

CREATE TABLE students (
    student_id INT PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    batch_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (batch_id) REFERENCES batches(batch_id)
        ON DELETE SET NULL
);



-- Create Attendance Table

CREATE TABLE attendance (
    attendance_id INT PRIMARY KEY,
    student_id INT NOT NULL,
    batch_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    status VARCHAR2(10) DEFAULT 'Absent'
        CHECK (status IN ('Present', 'Absent')),
    CONSTRAINT fk_attendance_student 
        FOREIGN KEY (student_id) REFERENCES students(student_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_attendance_batch
        FOREIGN KEY (batch_id) REFERENCES batches(batch_id)
            ON DELETE CASCADE
);




-- Create Fees table

CREATE TABLE fees (
    fee_id INT PRIMARY KEY,
    student_id INT NOT NULL,
    month VARCHAR2(20) NOT NULL,
    quarter VARCHAR2(20),
    semiannual VARCHAR2(20),
    annual VARCHAR2(20),
    amount NUMBER(10,2) NOT NULL,
    status VARCHAR2(10) DEFAULT 'Unpaid'
        CHECK (status IN ('Paid','Unpaid')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_fees_student
        FOREIGN KEY (student_id) REFERENCES students(student_id)
            ON DELETE CASCADE
);


-- Create Invoice Table

CREATE TABLE invoices (
    invoice_id INT PRIMARY KEY,
    student_id INT NOT NULL,
    fee_id INT NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
        ON DELETE CASCADE,
    FOREIGN KEY (fee_id) REFERENCES fees(fee_id)
        ON DELETE CASCADE
);


-- Displaying all created tables
SELECT table_name FROM user_tables;