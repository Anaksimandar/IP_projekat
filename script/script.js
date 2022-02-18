
        $().ready(()=>{
            $(".alert").hide();
        })
        let proizvodi = [];
        let kategorije = [];
        let sortiraniProizvodi = [];
        
        //
        // let xttp = new XMLHttpRequest();
        // xttp.onreadystatechange = function(){
        //     if(this.status == 200 && this.readyState == 4){
        //         let data = JSON.parse(this.responseText);
        //         proizvodi = data;
        //         console.log(data);
        //     }
        // }
        // xttp.open("get","https://60db3f05801dcb0017290ffe.mockapi.io/api/products",true);
        // xttp.send();
        const url1 = 'https://60db3f05801dcb0017290ffe.mockapi.io/api/products';
        const url2 = 'https://60db3f05801dcb0017290ffe.mockapi.io/api/kategorije';
        const promise1 = fetch(url1)
            .then(proizvodi=>proizvodi.json())
            .then(data=>proizvodi = sortiraniProizvodi = data);
        const promise2 = fetch(url2)
            .then(p=>p.json())
            .then(p=>kategorije = p)
            
        
        
        function prikazModalaZaDodavanjeProizvoda(){
            kategorije.forEach(kategorija => {
                $("#dodavanje_proizvoda_prikaz_kategorija").append(`<option value=${kategorija.id_kategorije}>${kategorija.naziv_kategorije}</option>`)
            });
            $("#dodajModalProizvodi").modal('show');
        }
        function getNazivKategorije(id_kategorije){
            naziv =  kategorije.filter(k=>k.id_kategorije == id_kategorije)[0].naziv_kategorije;
            return naziv;
            
        }
        function dodajProizvod(){
                

                let naziv = document.querySelector("#dodajNaziv").value;
                let opis = document.querySelector("#dodajOpis").value;
                let cena = document.querySelector("#dodajCenu").value;
                let id_kategorije = document.querySelector("#dodavanje_proizvoda_prikaz_kategorija").value;
                let id = parseInt(proizvodi[proizvodi.length-1].id_proizvoda)+1;
                
                let noviProizvod = {
                    'id_kategorije':id_kategorije,
                    'opis':opis,
                    'cena':cena,
                    'naziv':naziv,
                    'id_proizvoda':id.toString(),

                }
                proizvodi.push(noviProizvod);
                prikazProizvoda();
                $("#obavestenjeDodavanjeProizvoda").show().fadeOut(3000);

                
        }
        function prikazProizvoda(){
            
            $("#prikazRedovaProizvoda").html("");
            
            sortiraniProizvodi.forEach(p => {
                $("#prikazRedovaProizvoda").append(
                    `<tr>
                        <td>${p.naziv}</td>
                        <td>${p.opis}</td>
                        <td>${p.cena}</td>
                        <td>${getNazivKategorije(p.id_kategorije)}</td>
                        <td><button  onclick='izmeniProizvod(${p.id_proizvoda})'class='btn btn-info'>Izmeni</button></td>
                        <td><button onclick='obrisiProizvod(${p.id_proizvoda})' class='btn btn-danger'>Obrisi</button></td>
                    </tr>
                    `);
            });
            sortiraniProizvodi = [].concat(proizvodi);
            
            
            
       
        }
        function izmeniProizvod(id){
            $("#prikaz_kategorija").empty();
            let izabranProizvod = proizvodi.filter(proizvod=>proizvod.id_proizvoda == id);
            $("#izmena_naziv").val(izabranProizvod[0].naziv);
            $("#izmena_opis").val(izabranProizvod[0].opis);
            $("#izmena_cena").val(izabranProizvod[0].cena);
            $("#izmena_id").val(parseInt(izabranProizvod[0].id_proizvoda));
            let id_kategorije = izabranProizvod[0].id_kategorije;
            kategorije.forEach(kategorija => {
                $("#prikaz_kategorija").append(`<option value=${kategorija.id_kategorije}>${kategorija.naziv_kategorije}</option>`)
            });
            $("#prikaz_kategorija").val(id_kategorije);
            $("#izmenaModalProizvod").modal('show');
            
        }
        function obrisiProizvod(id){
            let izabranProizvod = proizvodi.filter(p=>p.id_proizvoda!=id);
            proizvodi = izabranProizvod;
            prikazProizvoda();
        }
        function sacuvajIzmene(){
            
            let id = $("#izmena_id").val();
            let izabranProizvod = proizvodi.filter(proizvod=>proizvod.id_proizvoda == id);
            izabranProizvod[0].naziv = $("#izmena_naziv").val();
            izabranProizvod[0].opis = $("#izmena_opis").val();
            izabranProizvod[0].cena = $("#izmena_cena").val();
            izabranProizvod[0].id_kategorije = $("#prikaz_kategorija").val();
            $("#obavestenjeIzmenaProizvoda").show().fadeOut(3000);
            prikazProizvoda();
        }
            
            

        
        function zatvaranjeModala(id_modal){
            $("#dodajNaziv").val("");
            $("#dodajOpis").val("");
            $("#dodajCenu").val("");
            $("#dodajNaziv").val("");
            $(`#${id_modal}`).modal('hide');
            
            

            
        }
        function vratiKategoriju(id){
            let kategorija = kategorije.filter(k=>k.id_kategorije == id)[0];
            return kategorija;
        }
        //Kategorije
        function prikazModalaZaDodavanjeKategorije(){
            $("#dodajModalKategorije").modal('show');
            
        }
        function izmeniKategoriju(id){
            // izmena i cuvanje kategorija
            let izabranaKategorija = kategorije.filter(k=>k.id_kategorije == id);
            $("#izmena_id_kategorije").val(izabranaKategorija[0].id_kategorije);
            $("#dodajNoviNazivKategorije").val(izabranaKategorija[0].naziv_kategorije);
            $("#izmenaKategorije").modal('show');
            
        }
        function sacuvajIzmeneKategorije(){
            let id = $("#izmena_id_kategorije").val();
            let naziv = $("#dodajNoviNazivKategorije").val();
            let izabranaKategorija = vratiKategoriju(id);
            izabranaKategorija.naziv_kategorije = naziv;
            $("#obavestenjeIzmeneKategorije").show().fadeOut(3000);
            prikazKategorija();
        }
        function da_li_je_kategorija_u_proizvodu(id){
            let postoji = false;
            proizvodi.forEach(p => {
                if(p.id_kategorije == id){
                    postoji = true;
                    
                }
            });
            return postoji;
            
        }
        function obrisiKategoriju(id){
            
            
            if(!da_li_je_kategorija_u_proizvodu(id)){

                let filtrirane_kategorije = kategorije.filter(kat=>kat.id_kategorije != id);
                kategorije = filtrirane_kategorije;
                $("#obavestenjeBrisanjeUspeh").show().fadeOut(3000);
                
                return prikazKategorija();
            }
            
            $("#obavestenjeBrisanjeNeuspeh").show().fadeOut(3000);
            

            
            
            
        }
        function prikazKategorija(){
            $("#prikazRedovaKategorija").html("");
            kategorije.forEach(k => {
                $("#prikazRedovaKategorija").append(
                    `<tr>
                        <td>${k.naziv_kategorije}</td>
                        <td><button  onclick='izmeniKategoriju(${k.id_kategorije})'class='btn btn-info'>Izmeni</button></td>
                        <td><button onclick='obrisiKategoriju(${k.id_kategorije})' class='btn btn-danger'>Obrisi</button></td>
                    </tr>
                    `);
            });
        }
        function dodajKategoriju(){
            let id = parseInt(kategorije[kategorije.length-1].id_kategorije)+1;
            let naziv = $("#nazivKategorije").val();
            let novaKategorija = {
                'id_kategorije':id,
                'naziv_kategorije':naziv,
            }
            kategorije.push(novaKategorija);
            prikazKategorija();
            $("#obavestenjeDodavanjeKategorije").show().fadeOut(3000);
        }
        //Sortiranje
        $("#sortiranjeProizvoda").change(()=>{
            let metoda = $("#sortiranjeProizvoda").val();
            switch(metoda){
                case '0': prikazProizvoda();
                case '1': sortiranjeNazivRastuce();
                break;
                case '2': sortiranjeNazivOpadajuce();
                break;
                case '3': sortiranjeCenaRastuce();
                break;
                case '4': sortiranjeCenaOpadajuce();
                break;
                
            }
        })

        function sortiranjeCenaOpadajuce(){
            sortiraniProizvodi.sort((a,b)=>b.cena-a.cena);
            prikazProizvoda();
        }
        function sortiranjeCenaRastuce(){
            sortiraniProizvodi.sort((a,b)=>a.cena-b.cena);
            prikazProizvoda();
        }
        function sortiranjeNazivOpadajuce(){
            sortiraniProizvodi.sort((a,b)=>a.naziv.charCodeAt(0) - b.naziv.charCodeAt(0));
            prikazProizvoda();
        }
        function sortiranjeNazivRastuce(){
            sortiraniProizvodi.sort((a,b)=>b.naziv.charCodeAt(0) - a.naziv.charCodeAt(0));
            prikazProizvoda();
        }
        // pretraga
        $("#unetPojam").on('keyup',()=>{
            let unos = $("#unetPojam").val();
            sortiraniProizvodi = filtrirajPodatke(unos);
            prikazProizvoda();

        })

        function filtrirajPodatke(unos){
            let filtrirani = [];
            console.log(unos);
            proizvodi.forEach(proizvod => {
                unos = unos.toLowerCase();
                naziv = proizvod.naziv.toLowerCase();
                opis = proizvod.opis.toLowerCase();
                if(opis.includes(unos) || naziv.includes(unos)){
                    filtrirani.push(proizvod);
                }
            });
            return filtrirani;
        }