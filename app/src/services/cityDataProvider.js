import React from 'react';
import Agent from "../../services/agent";

class cityDataProvider extends React.Component {
    render() {
        // Используйте Provider, чтобы передать текущую тему вглубь дерева.
        // Любой компонент может считать её, вне зависимости от того как глубоко она находится.
        // В данном примере, мы передаем "dark" как текущее значение.
        return (
            <div>

            </div>
        );
    }
}

export default new cityDataProvider();