// Exercícios

// 1) Qual modelo de carro tem mais multas? 
db.multa.aggregate([
    {
        $lookup: {
            from: "veiculo",
            localField: "veiculo_id",
            foreignField: "_id",
            as: "veiculo_info"
        }    
    },
    {
        $unwind: "$veiculo_info"
    },
    {
        $lookup: {
          from: "modelo",
          localField: "veiculo_info.modelo_id",
          foreignField: "_id",
          as: "modelo_info"
        }
    },
    { 
        $unwind: "$modelo_info" 
    },
    {
        $group: {
            _id: "$modelo_info._id",
            nome: { $first: "$modelo_info.nome" },
            quantidade: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0
        }
    },
    { 
        $sort: {quantidade: -1} 
    },
    { 
        $limit: 1 
    }
])

// 2) Quantas multas por cidade? 
db.multa.aggregate([
    {
        $lookup: {
            from: "cidade",
            localField: "cidade_id",
            foreignField: "_id",
            as: "cidade_info"
        }    
    },
    { $unwind: "$cidade_info" },
    {
        $group: {
            _id: "$cidade_info._id",
            cidade: { $first: "$cidade_info.nome" },
            quantidade: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            cidade: 1,
            quantidade: 1
        }
    },
    { $sort: { quantidade: -1 } }
])

// 3) Qual é a infração mais aplicada?
db.multa.aggregate([
    {
        $lookup: {
            from: "infracao",
            localField: "infracao_id",
            foreignField: "_id",
            as: "infracao_info"
        }    
    },
    {
        $unwind: "$infracao_info"
    },
    {
        $group: {
            _id: "$infracao_info._id",
            quantidade: { $sum: 1 },
            infracao: { $first: "$infracao_info.descricao" },
        }
    },
    {
        $project: {
            _id: 0,
            infracao: 1,
            quantidade: 1
        }
    },
    { $sort: {quantidade: -1} },
    { $limit: 1 },
])

// 4) Qual mês do ano tem mais multas? 
db.multa.aggregate([
    {
        $project: {
            mes: { $month: "$data_multa" }
        }
    },
    {
        $group: {
            _id: "$mes",
            quantidade: { $sum: 1 }
        }
    },
    {
        $project: {
            mes: "$_id",
            _id: 0,
            quantidade: 1
        }
    },
    {
        $sort: { quantidade: -1 }
    },
    {
        $limit: 1
    }
])

// 5) Qual é a cor de veículo mais multada? 
db.multa.aggregate([
    {
        $lookup: {
            from: "veiculo",
            localField: "veiculo_id",
            foreignField: "_id",
            as: "veiculo_info"
        }    
    },
    {
        $unwind: "$veiculo_info"
    },
    {
        $lookup: {
          from: "cor",
          localField: "veiculo_info.cor_id",
          foreignField: "_id",
          as: "cor_info"
        }
    },
    { 
        $unwind: "$cor_info" 
    },
    {
        $group: {
            _id: "$cor_info._id",
            cor: { $first: "$cor_info.nome" },
            quantidade: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0
        }
    },
    { 
        $sort: {quantidade: -1} 
    },
    { 
        $limit: 1 
    }
])

// 6) Qual agente aplica mais multas?
db.multa.aggregate([
    {
        $lookup: {
            from: "agente",
            localField: "agente_id",
            foreignField: "_id",
            as: "agente_info"
        }
    },
    {
        $unwind: "$agente_info"
    },
    {
        $group: {
            _id: "$agente_info._id",
            quantidade: { $sum: 1 },
            nome: { $first: "$agente_info.nome" }
        }
    },
    { 
        $sort: {quantidade: -1} 
    },
    { 
        $limit: 1 
    }
])

// 7) Qual sexo é mais multado? 
db.multa.aggregate([
    {
        $lookup: {
            from: "veiculo",
            localField: "veiculo_id",
            foreignField: "_id",
            as: "veiculo_info"
        }    
    },
    { $unwind: "$veiculo_info" },
    {
        $lookup: {
          from: "proprietario",
          localField: "veiculo_info.proprietario_id",
          foreignField: "_id",
          as: "proprietario_info"
        }
    },
    { $unwind: "$proprietario_info" },
    {
        $group: {
            _id: "$proprietario_info.sexo",
            quantidade: { $sum: 1 }
        }
    },
    {
        $project: {
            sexo: "$_id",
            _id: 0,
            quantidade: 1
        }
    },
    { $sort: {quantidade: -1} },
    { $limit: 1 }
])

// 8) Qual marca de carro os homens preferem? 
db.veiculo.aggregate([
    {
        $lookup: {
            from: "modelo",
            localField: "modelo_id",
            foreignField: "_id",
            as: "modelo_info"
        }    
    },
    {
        $unwind: "$modelo_info"
    },
    {
        $lookup: {
            from: "marca",
            localField: "modelo_info.marca_id",
            foreignField: "_id",
            as: "marca_info"
        }
    },
    { $unwind: "$marca_info" },
    {
        $lookup: {
          from: "proprietario",
          localField: "proprietario_id",
          foreignField: "_id",
          as: "proprietario_info"
        }
    },
    { 
        $unwind: "$proprietario_info" 
    },
    {
        $match: {
            "proprietario_info.sexo": "M"
        }
    },
    {
        $group: {
            _id: "$marca_info.nome",
            quantidade: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            nome: "$_id",
            quantidade: 1
        }
    }
])

// 9) Qual cor de carro as mulheres mais preferem? 
db.veiculo.aggregate([
    {
        $lookup: {
            from: "cor",
            localField: "cor_id",
            foreignField: "_id",
            as: "cor_info"
        }    
    },
    {
        $unwind: "$cor_info"
    },
    {
        $lookup: {
          from: "proprietario",
          localField: "proprietario_id",
          foreignField: "_id",
          as: "proprietario_info"
        }
    },
    { 
        $unwind: "$proprietario_info" 
    },
    {
        $match: {
            "proprietario_info.sexo": "F"
        }
    },
    {
        $group: {
            _id: "$cor_info.nome",
            quantidade: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            cor: "$_id",
            quantidade: 1
        }
    },
    { $sort: {quantidade: -1} },
    { $limit: 1 },
])

// 10) Faça um ranking dos veículos mais multados, decrescente. 
db.multa.aggregate([
    {
        $lookup: {
            from: "veiculo",
            localField: "veiculo_id",
            foreignField: "_id",
            as: "veiculo_info"
        }    
    },
    {
        $unwind: "$veiculo_info"
    },
    {
        $group:{
            _id: "$veiculo_id",
            placa_veiculo: { $first: "$veiculo_info.placa" },
            quantidade: { $sum: 1 }
        }
    },
    {
        $project:{
            _id: 0,
            placa_veiculo: 1,
            quantidade: 1
        }
    },
    { $sort: {quantidade: -1} }
])