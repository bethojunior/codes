<div class="row">
    <form id="formProucts" class="col l4 m12 s12">
        <input class="col l12 m12 s12" type="text" placeholder="Nome" id="nameProduct" name="nameProduct">
        <input class="col l12 m12 s12" type="number" placeholder="Valor" id="valueProduct" name="valueProduct">
        <textarea type="text" placeholder="Descrição do produto" name="descriptionProdust" id="descriptionProdust"></textarea>

        <div class="file-field input-field">
            <div class="btn">
                <span>File</span>
                <input name="imageValue" id="imageValue" type="file">
            </div>
            <div class="file-path-wrapper">
                <input class="file-path validate" type="text">
            </div>
        </div>
        <button type="button" onclick="insertNewProduct()" class="btn col l12 m12 s12">Salvar</button>
    </form>

    <div class='col l8 m12 s12'>
        <span class='fontMontserrat fs-3'>Meus produtos</span>
        <div class='col l12 m12 s12 heightProducts'>
            <table class='bordered striped highlight'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody id='listMyProducts'>

                </tbody>
            </table>
            
        </div>
    </div>
</div>