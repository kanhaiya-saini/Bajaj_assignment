const express = require('express');
const app = express();

app.use(express.json());

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Input data must be an array."
            });
        }

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabet_string = "";

        data.forEach(item => {
            if (!isNaN(item) && !isNaN(parseFloat(item))) { 
                const num = parseInt(item);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(String(item));
                } else {
                    odd_numbers.push(String(item));
                }
            } else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) { 
                alphabets.push(item.toUpperCase());
                alphabet_string += item;
            } else {
                special_characters.push(String(item));
            }
        });

        const reversed_alphabets = alphabet_string.split('').reverse().join('');
        
    
        let concat_string = "";
        for (let i = 0; i < reversed_alphabets.length; i++) {
            if (i % 2 === 0) { 
                concat_string += reversed_alphabets[i].toUpperCase();
            } else { 
                concat_string += reversed_alphabets[i].toLowerCase();
            }
        }

        const response = {
            is_success: true,
            user_id: "kanhaiya_123",     
            email: "kanhaiya1734.be22@chitkara.edu.in",
            roll_number: "2210991734",                
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: String(sum),
            concat_string: concat_string
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});