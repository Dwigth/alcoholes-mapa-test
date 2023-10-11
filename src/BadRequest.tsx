import styled from "styled-components";

const BadRequestTitle = styled.h2`
color: #888;
`;
function BadRequest() {

    return (
        <BadRequestTitle>Los parámetros de consulta no están configurados o tienen formato incorrecto</BadRequestTitle>
    )
}

export default BadRequest;