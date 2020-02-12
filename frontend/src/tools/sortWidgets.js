import '../index.css';

export function sortWidgets(ideas, event) {
    if (event.target.value === 'ID') {
        ideas.sort((a, b) => {
            let result = 0;

            if (a.id < b.id) {
            result = -1;
            }
            else if (a.id > b.id) {
            result = 1;
            }

            return result;
        });
    }
    else if (event.target.value === 'Title') {
        ideas.sort((a, b) => {
            let result = 0;

            if (a.title < b.title) {
            result = -1;
            }
            else if (a.title > b.title) {
            result = 1;
            }

            return result;
        });
    }
    else if (event.target.value === 'Category') {
        ideas.sort((a, b) => {
            let result = 0;

            if (a.category < b.category) {
            result = -1;
            }
            else if (a.category > b.category) {
            result = 1;
            }

            return result;
        });
    }
    else if (event.target.value === 'Date') {
        ideas.sort((a, b) => {
            let result = 0;

            a = new Date(a.timestamp);
            b = new Date(b.timestamp);
            if (a < b) {
            result = 1;
            }
            else if (a > b) {
            result = -1;
            }

            return result;
        });
    }

    return ideas;
}