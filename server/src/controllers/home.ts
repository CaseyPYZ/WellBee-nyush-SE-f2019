import { Request, Response } from "express";

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
    if (req.user) {
        console.log("HOME WITH USER");
        return res.send({user: req.user});
    }
    console.log("HOME WITHOUT USER");
    return res.send();
<<<<<<< HEAD
    // res.render("home", {
    //     title: "Home"
    // });
=======
>>>>>>> master
};
