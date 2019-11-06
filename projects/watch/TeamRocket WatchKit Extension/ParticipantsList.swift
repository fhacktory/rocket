//
//  ParticipantsList.swift
//  TeamRocket WatchKit Extension
//
//  Created by Nicolas Lebrun on 12/10/2019.
//  Copyright © 2019 Nicolas Lebrun. All rights reserved.
//

import SwiftUI

struct ParticipantsList: View {
    @EnvironmentObject var viewModel: ViewModel

    var body: some View {
        List(viewModel.meetingState?.persons ?? []) { person in
            Text("\(person.name) : \(person.totalCost) €").bold().font(.system(size:20))
        }
    }
}

struct ParticipantsList_Previews: PreviewProvider {
    static var previews: some View {
        ParticipantsList().environmentObject(ViewModel())
    }
}
