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

class ViewModel: ObservableObject {
    @Published var money: Double = 0.0
    @Published var moneyDescription: String = "0"
    @Published var meetingState: MeetingState? = nil
    @Published var meetingShouldEnd: Bool = false

    let apiUrl : URL = URL(string: "http://127.0.0.1:3000")!

    func startTimer() {
        _ = Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(getMeetingState), userInfo: nil, repeats: true)
    }

    @objc private func getMeetingState() {
        AF.request("\(apiUrl)/watch/state").responseJSON { response in
            guard let data = response.data, let state = try? JSONDecoder().decode(MeetingState.self, from: data) else {
                print("Error: Couldn't decode data into matches")
                return
            }

            self.meetingState = state
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
