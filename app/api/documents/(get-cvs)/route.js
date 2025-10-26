import { firestore_db } from "@/lib/firebaseAdmin";

export async function Get(req) {
    try {
        const uid = req.headers.get("x-user-uid");
        if (!uid) return new Response("The user id is missing.", { status: 401 });

        const docsSnap = await firestore_db
            .collection("CvDetails")
            .where("userId", "==" , uid)
            .get();

        if (docsSnap.empty) {
            const now = new Date();
           
            const docData = {
                belongsTo: uid,
                name: "My First CV",
                title: "Your Job Title",
                summary: "Write a short professional summary here.",
                contact: {
                    phone: "",
                    email: "",
                    github: "",
                    linkedin: "",
                    x: "",
                    facebook: "",
                    instagram: "",
                    threads: "",
                },
                address: "",
                sections: {
                    education: [],
                    experience: [],
                    projects: [],
                    skills: [],
                },
                createdAt: now,
                updatedAt: now,
            };

            const docRef = firestore_db.collection("documents").doc();
            await docRef.set(docData);

            Response.json(
                {
                    type: "success",
                    documents: [{ id: docRef.id, ...docData }],
                    message: "User documents fetched successfully!",
                },
                { status: 200 }
            );
        }

        const userDocs = docsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        Response.json(
            { 
                type: "success", 
                documents: userDocs, 
                message: "User documents fetched successfully!", 
            }, 
            { status: 200 }
        );
    } catch (error) {
        
    }
}