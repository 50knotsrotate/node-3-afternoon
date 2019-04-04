module.exports = {
    create: (req, res) => {
        const db = req.app.get("db");
        const { name, description, price, image_url } = req.body

        db.create_product([name, description, price, image_url])
            .then(() => res.status(200))
            .catch(err => console.log(err));
    },
    getOne: (req, res) => {
        const db = req.app.get("db");
        const { id } = req.params;

        db.read_product(id)
            .then(product => res.status(200).send(product))
            .catch(err => {
                res.status(500).send("Something go uh oh :(");
                console.log(err);
            });
    },
    getAll: (req, res) => {
        const dbInstance = req.app.get('db');
        
        dbInstance.read_products()
            .then(products => res.status(200).send(products))
            .catch(err => {
                res.status(500).send("Something go uh oh :(");
                console.log(err);
            });
    },
    update: (req, res) => {
        const db = req.app.get("db");
        const { params, query } = req

        db.update_product([params.id, query.description])
            .then(() => res.status(200))
            .catch(err => {
                res.status(500).send("Something go uh oh :(");
                console.log(err);
            });
    },
    delete: (req, res) => {
        const db = req.app.get("db");
        const { id } = req.params

        db.delete_product(id)
            .then(() => res.status(200))
            .catch(err => {
                res.staus(500).send("Something go ug oh :(");
            });
    }
};