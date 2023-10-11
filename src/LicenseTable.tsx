import styled from "styled-components";
import { LicenseInformation } from "./types";

const Table = styled.table`
border-collapse: collapse;
/* margin: 25px 25px; */
border-spacing: 0;
font-size: 0.9em;
/* font-family: sans-serif; */
width: 100%;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
margin-bottom: 50px;
`;

function LicenseTable(props: { licenseData: LicenseInformation }) {
    const values = Object.values(props.licenseData);
    const tableDictionary = new Map<string, string>([
        ['rfc', 'RFC'],
        ['licenseName', 'Licenciatario'],
        ['license', 'Licencia'],
        ['address', 'Domicilio'],
        ['rula', 'RULA'],
    ])
    return (
        <>
            <Table aria-describedby="Información" >
                <thead>
                    <tr>
                        <th>Datos</th>
                        <th>Valores</th>
                    </tr>

                </thead>
                <tbody className="active-row">
                    {Object.keys(props.licenseData).map((key, index) => (
                        <tr key={index}>
                            <td><strong>{tableDictionary.get(key)}</strong></td>
                            <td>{values[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default LicenseTable;