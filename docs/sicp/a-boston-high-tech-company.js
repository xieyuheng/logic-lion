let logic = require ("logic-db")

let job = new logic.db_t
let salary = new logic.db_t
let address = new logic.db_t
let supervisor = new logic.db_t

job.i ({
    name: "Bitdiddle Ben",
    dept: "computer",
    role: "wizard",
})

salary.i ({
    name: "Bitdiddle Ben",
    amount: 60000,
})

address.i ({
    name: "Bitdiddle Ben",
    town: "Slumerville",
    road: "Ridge Road",
    door: 10,
})

address.i ({
    name: "Hacker Alyssa P",
    town: "Cambridge",
    road: "Mass Ave",
    door: 78,
})

job.i ({
    name: "Hacker Alyssa P",
    dept: "computer",
    role: "programmer",
})

salary.i ({
    name: "Hacker Alyssa P",
    amount: 40000,
})

supervisor.i ({
    slave: "Hacker Alyssa P",
    master: "Bitdiddle Ben",
})


address.i ({
    name: "Fect Cy D",
    town: "Cambridge",
    road: "Ames Street",
    door: 3,
})

job.i ({
    name: "Fect Cy D",
    dept: "computer",
    role: "programmer",
})

salary.i ({
    name: "Fect Cy D",
    amount: 35000,
})

supervisor.i ({
    slave: "Fect Cy D",
    master: "Bitdiddle Ben",
})


address.i ({
    name: "Tweakit Lem E",
    town: "Boston",
    road: "Bay State Road",
    door: 22,
})

job.i ({
    name: "Tweakit Lem E",
    dept: "computer",
    role: "technician",
})

salary.i ({
    name: "Tweakit Lem E",
    amount: 25000,
})

supervisor.i ({
    slave: "Tweakit Lem E",
    master: "Bitdiddle Ben",
})

address.i ({
    name: "Reasoner Louis",
    town: "Slumerville",
    road: "Pine Tree Road",
    door: 80,
})

job.i ({
    name: "Reasoner Louis",
    dept: "computer",
    role: "programmer trainee",
})

salary.i ({
    name: "Reasoner Louis",
    amount: 30000,
})

supervisor.i ({
    slave: "Reasoner Louis",
    master: "Hacker Alyssa P",
})

supervisor.i ({
    slave: "Bitdiddle Ben",
    master: "Warbucks Oliver",
})

address.i ({
    name: "Warbucks Oliver",
    town: "Swellesley",
    road: "The Manor",
})

job.i ({
    name: "Warbucks Oliver",
    dept: "administration",
    role: "big wheel",
})

salary.i ({
    name: "Warbucks Oliver",
    amount: 150000,
})

address.i ({
    name: "Scrooge Eben",
    town: "Weston",
    road: "Shady Lane",
    door: 10,
})

job.i ({
    name: "Scrooge Eben",
    dept: "accounting",
    role: "chief accountant",
})

salary.i ({
    name: "Scrooge Eben",
    amount: 75000,
})

supervisor.i ({
    slave: "Scrooge Eben",
    master: "Warbucks Oliver",
})


address.i ({
    name: "Cratchet Robert",
    town: "Allston",
    road: "N Harvard Street",
    door: 16,
})

job.i ({
    name: "Cratchet Robert",
    dept: "accounting",
    role: "scrivener",
})

salary.i ({
    name: "Cratchet Robert",
    amount: 18000,
})

supervisor.i ({
    slave: "Cratchet Robert",
    master: "Scrooge Eben",
})

address.i ({
    name: "Aull DeWitt",
    town: "Slumerville",
    road: "Onion Square",
    door: 5,
})

job.i ({
    name: "Aull DeWitt",
    dept: "administration",
    role: "secretary",
})

salary.i ({
    name: "Aull DeWitt",
    amount: 25000,
})

supervisor.i ({
    slave: "Aull DeWitt",
    master: "Warbucks Oliver",
})

let can_do_job = new logic.db_t

can_do_job.i ({
    can: {
        dept: "computer",
        role: "wizard",
    },
    job: {
        dept: "computer",
        role: "programmer",
    },
})

can_do_job.i ({
    can: {
        dept: "computer",
        role: "wizard",
    },
    job: {
        dept: "computer",
        role: "technician",
    },
})

can_do_job.i ({
    can: {
        dept: "computer",
        role: "programmer",
    },
    job: {
        dept: "computer",
        role: "programmer trainee",
    },
})

can_do_job.i ({
    can: {
        dept: "administration",
        role: "secretary",
    },
    job: {
        dept: "administration",
        role: "big wheel",
    },
})

job.query_log (10) ({
    name: "?coder",
    dept: "computer",
    role: "programmer",
})

{
    solutions: [
        { coder: "Hacker Alyssa P" },
        { coder: "Fect Cy D" },
    ]
}

// employees' addresses
address.query_log (100) ({
    name: "?name",
    town: "?town",
    road: "?road",
    door: "?door",
})

// employees at computer dept
job.query_log (100) ({
    name: "?name",
    dept: "computer",
})

job.assert ({
    name: "Hacker Alyssa P",
    role: "programmer",
})

supervisor.assert_not ({
    slave: "?x",
    master: "?x",
})

let computer_dept_slave = new logic.db_t

computer_dept_slave.i ({
    slave: "?slave",
}) .cond ((the) => {
    let z = new logic.var_t
    return job.o ({ name: the.var.slave, dept: "computer" })
        .and (supervisor.o ({ slave: the.var.slave, master: z }))
})

computer_dept_slave.query_log (10) ({
    slave: "?slave",
})

let bigshot = new logic.db_t

bigshot.i ({
    name: "?name",
    dept: "?dept",
}) .cond ((the) => {
    let z = new logic.var_t
    return job.o ({ name: the.var.name, dept: the.var.dept })
        .not (supervisor.o ({ slave: the.var.name, master: z })
              .and (job.o ({ name: z, dept: the.var.dept })))
})

bigshot.query_log (100) ({
    name: "?name",
    dept: "?dept",
})

let not_so_poor = new logic.db_t

not_so_poor.i ({
    name: "?name",
    amount: "?amount",
}) .cond ((the) => {
    return salary.o ({ name: the.var.name, amount: the.var.amount })
        .pred ((subst) => subst.get (the.var.amount) >= 40000)
})

not_so_poor.query_log (10) ({
    name: "?name",
    amount: "?amount",
})
