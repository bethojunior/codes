<div class="row">
    <table class="striped highlight pd-2 responsive-table">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Data</th>
                <th>Total</th>
                <th>Status</th>
                <th>Opções</th>
            </tr>
        </thead>
        <tbody id="lastRequests">

        </tbody>
    </table>

    <div id="modalProductsRequests" class="modal modal-fixed-footer">
        <div class="modal-content">
            <table class="striped highlight pd-2">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody id="listProductsRequests">

                </tbody>
            </table>

        </div>
        <div class="modal-footer">
            <a class="modal-action modal-close waves-effect waves-green btn-flat">OK</a>
        </div>
    </div>

    <div class="modal modal-fixed-footer" id="modalStatusRequest">
        <div class="modal-content">
            <div class="input-field col s12">
                <input type="hidden" id="idRequest">
                <select id="statusRequest">
                    <option value="" disabled selected>Status do pedido</option>
                    <option value="Preparando">Preparando</option>
                    <option value="Saiu para entrega">Saiu para entrega</option>
                    <option value="ENTREGUE">Entregue</option>
                </select>
            </div>
        </div>
        <div class="modal-footer">
            <a onclick="changeStatus()" class="modal-action modal-close waves-effect waves-green btn-flat">OK</a>
        </div>
    </div>

</div>