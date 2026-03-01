fn exercise_3() {
    // 1️⃣ Create a mutable String
    let mut text = String::from("Hello");

    println!("Initial text: {}", text);

    // 2️⃣ Create two immutable references
    let r1 = &text;
    let r2 = &text;

    println!("Immutable references: {}, {}", r1, r2);
    // LAST USE of r1 and r2 is above

    // After this line, Rust knows r1 and r2 are no longer used.
    // Their borrow ends HERE (not at end of block).

    // 3️⃣ Now create a mutable reference
    let r3 = &mut text;
    r3.push_str(" Rust");

    println!("After mutation: {}", r3);
    // LAST USE of r3 is above

    // Mutable borrow ends HERE

    // 4️⃣ Create new immutable references again
    let r4 = &text;
    let r5 = &text;

    println!("New immutable references: {}, {}", r4, r5);

    // 5️⃣ Print final string
    println!("Final text: {}", text);
}