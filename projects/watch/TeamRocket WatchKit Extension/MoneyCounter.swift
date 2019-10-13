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
    @Published var moneyDescription: String = "0"
    @Published var state: WatchState? = nil
    @Published var meetingShouldEnd: Bool = false

    let apiUrl : URL = URL(string: "http://127.0.0.1:3000")!

    func startTimer() {
        _ = Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(callAPI), userInfo: nil, repeats: true)
    }

    @objc private func callAPI() {
        AF.request("\(apiUrl)/watch/state").responseJSON { response in
            guard let data = response.data, let state = try? JSONDecoder().decode(WatchState.self, from: data) else {
                print("Error: Couldn't decode data into matches")
                return
            }

            self.state = state
            self.money = Double(state.totalCost) ?? 0.0
            self.moneyDescription = state.totalCost
            if !self.meetingShouldEnd {
                self.meetingShouldEnd = state.remainingTime.contains("-")
            }
        }
    }

    func launchRocket() {
        AF.request("\(apiUrl)/fire", method: .post).responseJSON { response in
            print(response)
        }
    }
}

struct WatchState: Codable {
    let totalCost: String
    let persons: [Person]
    let bullshitCounter: Int
    let remainingTime: String
}

struct Person: Codable, Identifiable {
    let id: Int
    let name: String
    let totalCost: String
}
