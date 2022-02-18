class Proizvod{
    static proizvodi = [];
    constructor(id,naziv,opis,cena){
        this.id = id;
        this.naziv = naziv;
        this.opis = opis;
        this.cena = cena;
    }
    toString(){
        return `
        <table class="table">
        <thead>
            <tr>
              <th scope="col">Naziv</th>
              <th scope="col">Cena</th>
              <th scope="col">Opis</th>

              
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${this.naziv}</td>
              <td>${this.cena}</td>
              <td>${this.opis}</td>
              <td><button  onclick='izmeniProizvod(${this.id})'class='btn btn-info'>Izmeni</button></td>
              <td><button onclick='obrisiProizvod(${this.id})' class='btn btn-danger'>Obrisi</button></td>

            </tr>
            
          </tbody>
        </table>
        
        `;
    }

}







export function proba(){
    console.log("Radi heheh");
}

export default Proizvod