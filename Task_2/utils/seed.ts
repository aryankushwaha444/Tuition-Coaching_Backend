import { db } from "./prisma";



async function main() {
  const teacherUser = await db.user.create({
    data: {
      full_name: "Ram Bahadur",
      username: "ram_teacher",
      email: "ram@example.com",
      phone: "9800000001",
      password: "hashed_password",
      role: "teacher",
      is_active: true
    }
  });

  const studentUser1 = await db.user.create({
    data: {
      full_name: "Sita Thapa",
      username: "sita_student",
      email: "sita@example.com",
      phone: "9800000002",
      password: "hashed_password",
      role: "student",
      is_active: true
    }
  });

  const studentUser2 = await db.user.create({
    data: {
      full_name: "Ramesh Shrestha",
      username: "ramesh_student",
      email: "ramesh@example.com",
      phone: "9800000003",
      password: "hashed_password",
      role: "student",
      is_active: true
    }
  });

  const teacher = await db.teacher.create({
    data: {
      user_id: teacherUser.user_id,
      employee_number: "T-1001",
      specialization: "Mathematics",
      hire_date: new Date(),
      status: "active"
    }
  });

  const batch = await db.batch.create({
    data: {
      batch_name: "Grade 10 - Maths Batch A",
      course_name: "Mathematics",
      teacher_id: teacher.teacher_id,
      start_date: new Date("2024-01-15"),
      end_date: new Date("2024-05-30"),
      schedule: "Mon-Wed-Fri 7AM"
    }
  });

  const student1 = await db.student.create({
    data: {
      batch_id: batch.batch_id,
      user_id: studentUser1.user_id,
      date_of_birth: new Date("2008-05-10"),
      gender: "Female",
      parent_name: "Hari Thapa",
      parent_contact: "9800100200",
      Address: "Kathmandu",
      enrolled_date: new Date(),
      status: "active"
    }
  });

  const student2 = await db.student.create({
    data: {
      batch_id: batch.batch_id,
      user_id: studentUser2.user_id,
      date_of_birth: new Date("2008-03-18"),
      gender: "Male",
      parent_name: "Dhan Shrestha",
      parent_contact: "9800111122",
      Address: "Bhaktapur",
      enrolled_date: new Date(),
      status: "active"
    }
  });

  const exam = await db.exam.create({
    data: {
      name: "Quarterly Mathematics Exam",
      batch_id: batch.batch_id,
      date: new Date("2024-03-20"),
      total_marks: 100
    }
  });

  await db.exam_Result.createMany({
    data: [
      {
        student_id: student1.student_id,
        exam_id: exam.exam_id,
        marks_obtained: 87,
        grade: "A",
        status: "passed"
      },
      {
        student_id: student2.student_id,
        exam_id: exam.exam_id,
        marks_obtained: 76,
        grade: "B",
        status: "passed"
      }
    ]
  });

  await db.attendance.createMany({
    data: [
      {
        student_id: student1.student_id,
        user_id: studentUser1.user_id,
        batch_id: batch.batch_id,
        date: new Date("2024-02-01"),
        status: "present"
      },
      {
        student_id: student2.student_id,
        user_id: studentUser2.user_id,
        batch_id: batch.batch_id,
        date: new Date("2024-02-01"),
        status: "absent"
      }
    ]
  });
}

main()
  .then(async () => {
    await db.$disconnect();
    console.log("🌱 Seeding completed successfully!");
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
