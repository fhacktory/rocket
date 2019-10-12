//
//  MatchWS.swift
//  TeamRocket WatchKit Extension
//
//  Created by Nicolas Lebrun on 12/10/2019.
//  Copyright © 2019 Nicolas Lebrun. All rights reserved.
//

import Foundation
import Combine
import Alamofire

class MoneyCounter: ObservableObject {
    @Published var money: Double = 0.0
    @Published var moneyDescription: String = "0.0"

    func startTimer() {
        let timer = Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(callAPI), userInfo: nil, repeats: true)
    }

    @objc private func callAPI() {
        AF.request(URL(string: "http://127.0.0.1:3000/costs")!).responseJSON { response in
            guard let data = response.data, let costs = try? JSONDecoder().decode(Costs.self, from: data) else {
                print("Error: Couldn't decode data into matches")
                return
            }

            self.money = Double(costs.total) ?? 0.0
            self.moneyDescription = costs.total
        }
    }
}

struct Costs: Codable {
    let total: String
    let costPerPerson: [CostPerPerson]
}

struct CostPerPerson: Codable {
    let name: String
    let totalCost: String
}
