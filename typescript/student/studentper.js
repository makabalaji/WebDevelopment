function getTotalMarks(stud) {
    var total;
    total = stud.sub1 + stud.sub2 + stud.sub3;
    return total;
}
function getPercentage(stud) {
    var percentage;
    var totalMarks = getTotalMarks(stud);
    percentage = (totalMarks / 300) * 100;
    return percentage;
}
var students = [
    {
        name: "balaji",
        sub1: 70,
        sub2: 70,
        sub3: 70
    },
    {
        name: "sai",
        sub1: 80,
        sub2: 80,
        sub3: 80
    },
    {
        name: "kirank",
        sub1: 90,
        sub2: 90,
        sub3: 90
    }
];
for (var i = 0; i < students.length; i++) {
    var student = students[i];
    console.log("");
    console.log('Student Details of ' + student.name);
    console.log('Student Name: ' + student.name);
    console.log('Total Marks: ' + getTotalMarks(student));
    console.log('Percentage: ' + getPercentage(student).toFixed(2) + "%");
}